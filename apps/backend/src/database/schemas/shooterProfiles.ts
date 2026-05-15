import { defineEntity, type InferEntity, p } from "@mikro-orm/core";
import { Sports } from "@shooting_sports_scoreboard/common";
import { UserSchema } from "./auth.js";

export const ShooterProfileSchema = defineEntity({
	name: "ShooterProfile",
	uniques: [
		{
			properties: ["sport", "identifier"],
		},
	],
	properties: {
		id: p.uuid().primary(),
		name: p.string().nullable(),
		sport: p.enum(() => Sports),
		identifier: p.string(),
		user: () =>
			p.manyToOne(UserSchema).inversedBy("shooterProfiles").nullable(),
	},
});

export type ShooterProfile = InferEntity<typeof ShooterProfileSchema>;
