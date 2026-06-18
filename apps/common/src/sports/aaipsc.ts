import type { Sport } from "../sports.js";
import {
	BaseShooter,
	BaseSport,
	type BaseShooterCtorParams,
	type SportHasClassifications,
	type SportHasDivisions,
} from "./base.js";

const classes = ["GM", "M", "A", "B", "C", "U"] as const;
const divisions = [
	"Handgun - Standard",
	"Handgun - Open",
	"Handgun - Classic",
	"Handgun - Production",
	"Handgun - Production Optic",
	"Rifle - Semi Auto Open",
	"Rifle - Semi Auto Standard",
	"PCC - Optics",
	"PCC - Iron",
] as const;

export class AAIPSC
	extends BaseSport
	implements
		SportHasClassifications<typeof classes>,
		SportHasDivisions<typeof divisions>
{
	static override readonly name: string = "AAIPSC" as const;
	readonly classifications = classes;
	readonly divisions = divisions;
}

export class AAIPSCShooter extends BaseShooter {
	override sport: Sport = "AAIPSC";
	divisionsClassifications: Record<
		(typeof divisions)[number] | string,
		(typeof classes)[number] | string
	>;

	constructor(
		data: BaseShooterCtorParams & {
			divisionsClassifications: InstanceType<
				typeof AAIPSCShooter
			>["divisionsClassifications"];
		},
	) {
		super(data);
		this.divisionsClassifications = data.divisionsClassifications;
	}
}
