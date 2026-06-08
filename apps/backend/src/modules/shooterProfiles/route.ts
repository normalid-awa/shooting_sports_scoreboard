import { ormMarco } from "@/database/marcos.js";
import { ShooterProfile } from "@/database/schemas/shooterProfiles.js";
import {
	createLogicalFilterSchema,
	whereClauseFromFilter,
} from "@/utils/filters.js";
import { createPaginationQuerySchema } from "@/utils/paginations.js";
import { Sports } from "@shooting_sports_scoreboard/common";
import { Elysia } from "elysia";
import * as v from "valibot";
import { serialize, wrap } from "@mikro-orm/core";
import { authMarco } from "../auth/marco.js";
import { GuardFunction } from "@/utils/guards.types.js";
import { EntityManager } from "@mikro-orm/sql";

const createShooterProfileDto = v.object({
	name: v.string(),
	sport: v.picklist(Sports),
	identifier: v.string(),
});

const guardCreateShooterProfile: GuardFunction<
	[string, EntityManager, v.InferInput<typeof createShooterProfileDto>, string?]
> = async (
	userId: string,
	em: EntityManager,
	body: v.InferInput<typeof createShooterProfileDto>,
	excludeShooterProfileId?: string,
) => {
	if (
		(await em.count(ShooterProfile, {
			user: userId,
			sport: body.sport,
			id: { $ne: excludeShooterProfileId },
		})) > 0
	)
		return [403, `You already has a shooter profile for sport ${body.sport}.`];

	if (
		(await em.count(ShooterProfile, {
			identifier: body.identifier,
			sport: body.sport,
			id: { $ne: excludeShooterProfileId },
		})) > 0
	)
		return [
			403,
			`Identifier ${body.identifier} is already used for sport ${body.sport}.`,
		];
};

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
					pagination: createPaginationQuerySchema(["id", "name"], {
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
						sport: {
							ops: ["eq", "ne", "in", "nin"],
							schema: v.picklist(Sports),
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
			const shooterProfile = em.create(ShooterProfile, {
				identifier: body.identifier,
				name: user.name,
				sport: body.sport,
				user: user.id,
			});
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
			shooterProfile.identifier = body.identifier;
			shooterProfile.name = body.name;
			shooterProfile.sport = body.sport;
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
