import type { Sport } from "../sports.js";
import {
	BaseShooter,
	BaseSport,
	type BaseShooterCtorParams,
	type SportHasClassifications,
	type SportHasDivisions,
} from "./base.js";

const classes = ["GM", "M", "A", "B", "C", "D", "U"] as const;
const divisions = [
	"Handgun - Open",
	"Handgun - Standard",
	"Handgun - Classic",
	"Handgun - Production",
	"Handgun - Production Optics",
	"Handgun - Revolver",
	"Handgun - Optics",
	"Rifle - Semi Auto Open",
	"Rifle - Semi Auto Standard",
	"Rifle - Manual Action Contemporary",
	"Rifle - Manual Action Bolt",
	"Shotgun - Open",
	"Shotgun - Modified",
	"Shotgun - Standard",
	"Shotgun - Standard Manual",
	"PCC - Optics",
	"PCC - Iron",
] as const;

export class IPSC
	extends BaseSport
	implements
		SportHasClassifications<typeof classes>,
		SportHasDivisions<typeof divisions>
{
	static override readonly name: string = "IPSC" as const;
	readonly classifications = classes;
	readonly divisions = divisions;
}

export class IPSCShooter extends BaseShooter {
	override sport: Sport = "IPSC";
	divisionsClassifications: Record<
		(typeof divisions)[number] | string,
		(typeof classes)[number] | string
	>;

	constructor(
		data: BaseShooterCtorParams & {
			divisionsClassifications: InstanceType<
				typeof IPSCShooter
			>["divisionsClassifications"];
		},
	) {
		super(data);
		this.divisionsClassifications = data.divisionsClassifications;
	}
}
