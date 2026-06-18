import type { Sport } from "../sports.js";
import { ThreeGun, type ThreeGunShooter } from "./3gun.js";
import { AAIPSC, type AAIPSCShooter } from "./aaipsc.js";
import { IDPA, type IDPAShooter } from "./idpa.js";
import { IPSC, type IPSCShooter } from "./ipsc.js";
import { USPSA, type USPSAShooter } from "./uspsa.js";

export type UnionShooter =
	| ThreeGunShooter
	| AAIPSCShooter
	| IDPAShooter
	| IPSCShooter
	| USPSAShooter;

export function getSportFromSportEnum(sport: Sport) {
	switch (sport) {
		case "3-Guns":
			return ThreeGun;
		case "AAIPSC":
			return AAIPSC;
		case "IDPA":
			return IDPA;
		case "IPSC":
			return IPSC;
		case "USPSA":
			return USPSA;
	}
}
