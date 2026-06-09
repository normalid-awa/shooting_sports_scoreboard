import { ormMarco } from "@/database/marcos.js";
import { User } from "@/database/schemas/auth.js";
import { wrap } from "@mikro-orm/core";
import { Elysia, status } from "elysia";
import * as v from "valibot";
import { authMarco } from "../auth/marco.js";
import { Sports } from "@shooting_sports_scoreboard/common";
import { ShooterProfile } from "@/database/schemas/shooterProfiles.js";

export const userRoutes = new Elysia({
	prefix: "/user",
})
	.use(ormMarco)
	.use(authMarco)
	.get(
		"/:id",
		async ({ em, params: { id } }) => {
			const user = await em.findOne(User, id, {
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
	);
