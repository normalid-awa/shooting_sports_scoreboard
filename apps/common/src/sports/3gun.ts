import type { Sport } from "../sports.js";
import {
	BaseShooter,
	BaseSport,
	type BaseShooterCtorParams,
	type SportHasDivisions,
} from "./base.js";

const divisions = [
	"Unlimited",
	"Practical",
	"Practical 308",
	"Factory ",
	"Heavy",
] as const;

export class ThreeGun
	extends BaseSport
	implements SportHasDivisions<typeof divisions>
{
	static override readonly name: string = "3-Gun" as const;
	readonly divisions = divisions;
}

export class ThreeGunShooter extends BaseShooter {
	override sport: Sport = "3-Guns";
	divisions: ((typeof divisions)[number] | string)[];

	constructor(
		data: BaseShooterCtorParams & {
			divisions: InstanceType<typeof ThreeGunShooter>["divisions"];
		},
	) {
		super(data);
		this.divisions = data.divisions;
	}
}
