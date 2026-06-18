import { ThreeGun, ThreeGunShooter } from "./sports/3gun.js";
import { AAIPSC, AAIPSCShooter } from "./sports/aaipsc.js";
import { IDPA, IDPAShooter } from "./sports/idpa.js";
import { IPSC, IPSCShooter } from "./sports/ipsc.js";
import { USPSA, USPSAShooter } from "./sports/uspsa.js";

export const Sports = ["AAIPSC", "IPSC", "IDPA", "3-Guns", "USPSA"] as const;
export type Sport = (typeof Sports)[number];

export const SportClass = {
	AAIPSC: AAIPSC,
	IPSC: IPSC,
	IDPA: IDPA,
	"3-Guns": ThreeGun,
	USPSA: USPSA,
} as const;

export const SportShooter = {
	AAIPSC: AAIPSCShooter,
	IPSC: IPSCShooter,
	IDPA: IDPAShooter,
	"3-Guns": ThreeGunShooter,
	USPSA: USPSAShooter,
} as const;
