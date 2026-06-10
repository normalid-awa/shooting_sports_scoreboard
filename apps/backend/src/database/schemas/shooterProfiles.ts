import {
	RegionalCode,
	RegionalCodes,
	Sport,
	Sports,
} from "@shooting_sports_scoreboard/common";
import { User } from "./auth.js";
import {
	Entity,
	Enum,
	ManyToOne,
	PrimaryKey,
	Property,
} from "@mikro-orm/decorators/es";
import { Opt } from "@mikro-orm/core";

@Entity()
export class ShooterProfile {
	@PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
	id!: string;

	@Property()
	name!: string;

	@Enum(() => Sports)
	sport!: Sport;

	@Enum(() => RegionalCodes)
	region!: RegionalCode;

	@Property()
	identifier!: string;

	@ManyToOne()
	user!: User;

	@Property({ onCreate: () => new Date(), defaultRaw: "current_timestamp" })
	createdAt: Opt<Date> = new Date();
}
