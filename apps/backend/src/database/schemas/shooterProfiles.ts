import { defineEntity, type InferEntity, p } from "@mikro-orm/core";
import { Sports } from "@shooting_sports_scoreboard/common";

export const ShooterProfileSchema = defineEntity({
	name: "ShooterProfile",
	properties: {
		id: p.uuid().primary(),
		name: p.text(),
		sport: p.enum(() => Sports),
		userId: p.uuid().nullable(),
	},
});

export type ShooterProfile = InferEntity<typeof ShooterProfileSchema>;
