import type { Sport } from "../sports.js";
import { BaseShooter, BaseSport, type BaseShooterCtorParams, type SportHasClassifications, type SportHasDivisions } from "./base.js";
declare const classes: readonly ["GM", "M", "A", "B", "C", "D", "U"];
declare const divisions: readonly ["Handgun - Open", "Handgun - Standard", "Handgun - Classic", "Handgun - Production", "Handgun - Production Optics", "Handgun - Revolver", "Handgun - Optics", "Rifle - Semi Auto Open", "Rifle - Semi Auto Standard", "Rifle - Manual Action Contemporary", "Rifle - Manual Action Bolt", "Shotgun - Open", "Shotgun - Modified", "Shotgun - Standard", "Shotgun - Standard Manual", "PCC - Optics", "PCC - Iron"];
export declare class IPSC extends BaseSport implements SportHasClassifications<typeof classes>, SportHasDivisions<typeof divisions> {
    static readonly name: string;
    readonly classifications: readonly ["GM", "M", "A", "B", "C", "D", "U"];
    readonly divisions: readonly ["Handgun - Open", "Handgun - Standard", "Handgun - Classic", "Handgun - Production", "Handgun - Production Optics", "Handgun - Revolver", "Handgun - Optics", "Rifle - Semi Auto Open", "Rifle - Semi Auto Standard", "Rifle - Manual Action Contemporary", "Rifle - Manual Action Bolt", "Shotgun - Open", "Shotgun - Modified", "Shotgun - Standard", "Shotgun - Standard Manual", "PCC - Optics", "PCC - Iron"];
}
export declare class IPSCShooter extends BaseShooter {
    sport: Sport;
    divisionsClassifications: Record<(typeof divisions)[number] | string, (typeof classes)[number] | string>;
    constructor(data: BaseShooterCtorParams & {
        divisionsClassifications: InstanceType<typeof IPSCShooter>["divisionsClassifications"];
    });
}
export {};
