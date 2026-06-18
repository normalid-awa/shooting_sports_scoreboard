import { ThreeGun, ThreeGunShooter } from "./sports/3gun.js";
import { AAIPSC, AAIPSCShooter } from "./sports/aaipsc.js";
import { IDPA, IDPAShooter } from "./sports/idpa.js";
import { IPSC, IPSCShooter } from "./sports/ipsc.js";
import { USPSA, USPSAShooter } from "./sports/uspsa.js";
export declare const Sports: readonly ["AAIPSC", "IPSC", "IDPA", "3-Guns", "USPSA"];
export type Sport = (typeof Sports)[number];
export declare const SportClass: {
    readonly AAIPSC: typeof AAIPSC;
    readonly IPSC: typeof IPSC;
    readonly IDPA: typeof IDPA;
    readonly "3-Guns": typeof ThreeGun;
    readonly USPSA: typeof USPSA;
};
export declare const SportShooter: {
    readonly AAIPSC: typeof AAIPSCShooter;
    readonly IPSC: typeof IPSCShooter;
    readonly IDPA: typeof IDPAShooter;
    readonly "3-Guns": typeof ThreeGunShooter;
    readonly USPSA: typeof USPSAShooter;
};
