import { ormMarco } from "@/database/marcos.js";
import { ShooterProfile } from "@/database/schemas/shooterProfiles.js";
import {
	createLogicalFilterSchema,
	whereClauseFromFilter,
} from "@/utils/filters.js";
import { createPaginationQuerySchema } from "@/utils/paginations.js";
import {
	RegionalCodeMap,
	RegionalCodes,
	Sports,
} from "@shooting_sports_scoreboard/common";
import { Elysia } from "elysia";
import * as v from "valibot";
import { rel, serialize, wrap } from "@mikro-orm/core";
import { authMarco } from "../auth/marco.js";
import { EntityManager } from "@mikro-orm/sql";
import { User } from "@/database/schemas/auth.js";

const createShooterProfileDto = v.object({
	name: v.string(),
	identifier: v.string(),
	region: v.picklist(RegionalCodes),
	sport: v.union([
		v.literal("AAIPSC"),
		v.literal("IDPA"),
		v.literal("IPSC"),
		v.literal("USPSA"),
		v.literal("3-Guns"),
	]),
	divisionsClassifications: v.optional(v.record(v.string(), v.string())),
	divisions: v.optional(v.array(v.string())),
});

const guardCreateShooterProfile = async (
	userId: string,
	em: EntityManager,
	body: v.InferInput<typeof createShooterProfileDto>,
	excludeShooterProfileId?: string,
) => {
	if (
		(await em.count(ShooterProfile, {
			user: userId,
			sport: body.sport,
			region: body.region,
			id: { $ne: excludeShooterProfileId },
		})) > 0
	)
		return [
			403,
			`You already has a shooter profile for sport ${body.sport} in ${RegionalCodeMap[body.region]}.`,
		] as const;

	if (
		(await em.count(ShooterProfile, {
			identifier: body.identifier,
			sport: body.sport,
			region: body.region,
			id: { $ne: excludeShooterProfileId },
		})) > 0
	)
		return [
			403,
			`Identifier ${body.identifier} is already used for sport ${body.sport} in ${RegionalCodeMap[body.region]}.`,
		] as const;
};

function assignShooterData(
	shooter: ShooterProfile,
	data: v.InferInput<typeof createShooterProfileDto>,
	userId: string,
) {
	if (data.sport == "3-Guns") {
		shooter.sportSpecificData = {
			divisions: data.divisions,
		};
	} else {
		shooter.sportSpecificData = {
			divisionsClassifications: data.divisionsClassifications,
		};
	}
	shooter.identifier = data.identifier;
	shooter.name = data.name;
	shooter.region = data.region;
	shooter.sport = data.sport;
	shooter.user = rel(User, userId);
}

export const shooterProfilesRoute = new Elysia({
	prefix: "shooter-profile",
})
	.use(ormMarco)
	.use(authMarco)
	.get(
		"/:id",
		async ({ params: { id }, em, status }) => {
			const shooterProfile = await em.findOne(ShooterProfile, id, {
				populate: ["user"],
			});
			if (!shooterProfile) return status(404);
			return wrap(shooterProfile).toObject();
		},
		{
			params: v.object({
				id: v.pipe(v.string(), v.uuid()),
			}),
		},
	)
	.get(
		"/self",
		async ({ em, user, status }) => {
			const shooterProfile = await em.find(ShooterProfile, {
				user: user.id,
			});
			if (!shooterProfile) return status(404);
			return serialize(shooterProfile);
		},
		{
			auth: true,
		},
	)
	.post(
		"/list",
		async ({ body, em }) => {
			return await em.findAndPagination(
				ShooterProfile,
				whereClauseFromFilter(body?.filter),
				{
					orderBy: "name",
					order: "desc",
					limit: 10,
					page: 1,
				},
				body?.pagination,
				{
					populate: ["user"],
				},
			);
		},
		{
			body: v.optional(
				v.object({
					pagination: createPaginationQuerySchema(["name", "createdAt"], {
						min: 1,
						max: 20,
					}),
					filter: createLogicalFilterSchema({
						user: {
							ops: ["eq", "in", "nin", "ne"],
							schema: v.string(),
						},
						name: {
							ops: ["like", "eq", "in", "nin"],
							schema: v.string(),
						},
						identifier: {
							ops: ["like", "eq", "in", "nin"],
							schema: v.string(),
						},
						sport: {
							ops: ["eq", "ne", "in", "nin"],
							schema: v.picklist(Sports),
						},
						region: {
							ops: ["eq", "ne", "in", "nin"],
							schema: v.picklist(RegionalCodes),
						},
					}),
				}),
			),
		},
	)
	.post(
		"/",
		async ({ body, em, status, user }) => {
			const guardResult = await guardCreateShooterProfile(user.id, em, body);
			if (guardResult) return status(guardResult[0], guardResult[1]);

			const shooterProfile = new ShooterProfile();
			assignShooterData(shooterProfile, body, user.id);

			await em.persist(shooterProfile).flush();
			return wrap(shooterProfile).toObject();
		},
		{
			auth: true,
			body: createShooterProfileDto,
		},
	)
	.put(
		"/:id",
		async ({ params: { id }, body, em, status, user }) => {
			const shooterProfile = await em.findOne(ShooterProfile, id);
			if (!shooterProfile) return status(404);
			if (shooterProfile.user.id !== user.id)
				return status(403, "You can only update your own shooter profile.");
			const guardResult = await guardCreateShooterProfile(
				user.id,
				em,
				body,
				id,
			);
			if (guardResult) return status(guardResult[0], guardResult[1]);

			assignShooterData(shooterProfile, body, user.id);

			await em.persist(shooterProfile).flush();
			return wrap(shooterProfile).toObject();
		},
		{
			auth: true,
			params: v.object({
				id: v.pipe(v.string(), v.uuid()),
			}),
			body: createShooterProfileDto,
		},
	)
	.delete(
		"/:id",
		async ({ params: { id }, em, status, user }) => {
			const shooterProfile = await em.findOne(ShooterProfile, id);
			if (!shooterProfile) return status(404);
			if (shooterProfile.user?.id !== user.id) return status(403);
			await em.remove(shooterProfile).flush();
			return status(204);
		},
		{
			params: v.object({
				id: v.pipe(v.string(), v.uuid()),
			}),
			auth: true,
		},
	);
