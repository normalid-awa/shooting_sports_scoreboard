import { ormMarco } from "@/database/marcos.js";
import { UserSchema } from "@/database/schemas/auth.js";
import { wrap } from "@mikro-orm/core";
import { Elysia, status } from "elysia";
import * as v from "valibot";
import { authMarco } from "../auth/marco.js";
import { Sports } from "@shooting_sports_scoreboard/common";
import { ShooterProfileSchema } from "@/database/schemas/shooterProfiles.js";

export const userRoutes = new Elysia({
	prefix: "/user",
})
	.use(ormMarco)
	.use(authMarco)
	.get(
		"/:id",
		async ({ em, params: { id } }) => {
			const user = await em.findOne(UserSchema, id, {
				populate: ["shooterProfiles"],
			});
			if (!user) return status(404);
			return wrap(user).toObject();
		},
		{
			params: v.object({
				id: v.pipe(v.string(), v.uuid()),
			}),
		},
	)
	.post(
		"/shooter-profile/create",
		async ({ em, body, user }) => {
			const isProfileExists =
				(await em.count(ShooterProfileSchema, {
					$and: [{ sport: body.sport }, { identifier: body.identifier }],
				})) == 1;

			if (isProfileExists)
				return status(
					409,
					`Identifier ${body.identifier} already exists for sport ${body.sport}`,
				);

			const shooterProfile = em.create(ShooterProfileSchema, {
				sport: body.sport,
				identifier: body.identifier,
				user: user.id,
			});
			await em.persist(shooterProfile).flush();
			return wrap(shooterProfile).toObject();
		},
		{
			body: v.object({
				sport: v.picklist(Sports),
				identifier: v.string(),
				name: v.optional(v.string()),
			}),
			auth: true,
		},
	);
