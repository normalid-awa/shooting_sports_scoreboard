import { Sport, Sports } from "@shooting_sports_scoreboard/common";
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

	@Enum(() => Sports)
	sport!: Sport;

	@Property()
	identifier!: string;

	@ManyToOne()
	user!: User;
}
