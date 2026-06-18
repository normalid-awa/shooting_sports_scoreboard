import type { Sport } from "../sports.js";
import { ThreeGun, type ThreeGunShooter } from "./3gun.js";
import { AAIPSC, type AAIPSCShooter } from "./aaipsc.js";
import { IDPA, type IDPAShooter } from "./idpa.js";
import { IPSC, type IPSCShooter } from "./ipsc.js";
import { USPSA, type USPSAShooter } from "./uspsa.js";
export type UnionShooter = ThreeGunShooter | AAIPSCShooter | IDPAShooter | IPSCShooter | USPSAShooter;
export declare function getSportFromSportEnum(sport: Sport): typeof ThreeGun | typeof AAIPSC | typeof IDPA | typeof IPSC | typeof USPSA;
