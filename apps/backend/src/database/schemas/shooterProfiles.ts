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

@Entity()
export class ShooterProfile {
	@PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
	id!: string;

	@Property()
	name!: string;

	@Enum({ items: () => Sports, nativeEnumName: "sport" })
	sport!: Sport;

	@Enum({ items: () => RegionalCodes, nativeEnumName: "region" })
	region!: RegionalCode;

	@Property()
	identifier!: string;

	@ManyToOne()
	user!: User;

	@Property({ type: "jsonb" })
	sportSpecificData?: {
		divisions?: string[];
		divisionsClassifications?: Record<string, string>;
	};

	@Property({ onCreate: () => new Date(), defaultRaw: "current_timestamp" })
	createdAt: Date = new Date();
}
