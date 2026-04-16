import * as p from "drizzle-orm/pg-core";
import { sportsEnum } from "./sports";

export const shooterProfiles = p.pgTable("shooter_profiles", {
	id: p.uuid().primaryKey(),
	name: p.text().notNull(),
	sport: sportsEnum().notNull(),
	userId: p.text(),
});
