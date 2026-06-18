import type { Sport } from "../sports.js";
import { BaseShooter, BaseSport, type BaseShooterCtorParams, type SportHasClassifications, type SportHasDivisions } from "./base.js";
declare const classes: readonly ["GM", "M", "A", "B", "C", "U"];
declare const divisions: readonly ["Handgun - Standard", "Handgun - Open", "Handgun - Classic", "Handgun - Production", "Handgun - Production Optic", "Rifle - Semi Auto Open", "Rifle - Semi Auto Standard", "PCC - Optics", "PCC - Iron"];
export declare class AAIPSC extends BaseSport implements SportHasClassifications<typeof classes>, SportHasDivisions<typeof divisions> {
    static readonly name: string;
    readonly classifications: readonly ["GM", "M", "A", "B", "C", "U"];
    readonly divisions: readonly ["Handgun - Standard", "Handgun - Open", "Handgun - Classic", "Handgun - Production", "Handgun - Production Optic", "Rifle - Semi Auto Open", "Rifle - Semi Auto Standard", "PCC - Optics", "PCC - Iron"];
}
export declare class AAIPSCShooter extends BaseShooter {
    sport: Sport;
    divisionsClassifications: Record<(typeof divisions)[number] | string, (typeof classes)[number] | string>;
    constructor(data: BaseShooterCtorParams & {
        divisionsClassifications: InstanceType<typeof AAIPSCShooter>["divisionsClassifications"];
    });
}
export {};
