import { pgEnum } from "drizzle-orm/pg-core";
import { Sports } from "@shooting_sports_scoreboard/common";

export const sportsEnum = pgEnum<string, typeof Sports>("sports", Sports);
