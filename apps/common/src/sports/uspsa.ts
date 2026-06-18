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
	"Pistol - Open",
	"Pistol - Limited",
	"Pistol - Limited-10",
	"Pistol - Production",
	"Pistol - Single-Stack",
	"Pistol - Revolver",
	"Pistol - Carry Optics",
	"Pistol - Pistol Caliber Carbine",
	"Pistol - Limited Optics",
	"Rifle - Open",
	"Rifle - Tactical",
	"Rifle - Limited",
	"Shotgun - Open",
	"Shotgun - Limited/Tactical",
	"Shotgun - Heavy Metal",
	"Multigun - Open",
	"Multigun - Tactical",
	"Multigun - Limited",
	"Multigun - Heavy Metal Tactical",
	"Multigun - Heavy Metal Limited Tactical",
	"Multigun - Modified",
] as const;

export class USPSA
	extends BaseSport
	implements
		SportHasClassifications<typeof classes>,
		SportHasDivisions<typeof divisions>
{
	static override readonly name: string = "USPSA" as const;
	readonly classifications = classes;
	readonly divisions = divisions;
}

export class USPSAShooter extends BaseShooter {
	override sport: Sport = "USPSA";
	divisionsClassifications: Record<
		(typeof divisions)[number] | string,
		(typeof classes)[number] | string
	>;

	constructor(
		data: BaseShooterCtorParams & {
			divisionsClassifications: InstanceType<
				typeof USPSAShooter
			>["divisionsClassifications"];
		},
	) {
		super(data);
		this.divisionsClassifications = data.divisionsClassifications;
	}
}
