import type { Sport } from "../sports.js";
import {
	BaseShooter,
	BaseSport,
	type BaseShooterCtorParams,
	type SportHasClassifications,
	type SportHasDivisions,
} from "./base.js";

const classes = ["DM", "MA", "EX", "SS", "MM", "NV", "UN"] as const;
const divisions = [
	"CDP",
	"ESP",
	"SSP",
	"CCP",
	"CO",
	"REV",
	"BUG",
	"PCC",
] as const;

export class IDPA
	extends BaseSport
	implements
		SportHasClassifications<typeof classes>,
		SportHasDivisions<typeof divisions>
{
	static override readonly name: string = "IDPA" as const;
	readonly classifications = classes;
	readonly divisions = divisions;
}

export class IDPAShooter extends BaseShooter {
	override sport: Sport = "IDPA";
	divisionsClassifications: Record<
		(typeof divisions)[number] | string,
		(typeof classes)[number] | string
	>;

	constructor(
		data: BaseShooterCtorParams & {
			divisionsClassifications: InstanceType<
				typeof IDPAShooter
			>["divisionsClassifications"];
		},
	) {
		super(data);
		this.divisionsClassifications = data.divisionsClassifications;
	}
}
