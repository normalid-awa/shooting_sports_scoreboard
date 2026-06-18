import type { Sport } from "../sports.js";
import { BaseShooter, BaseSport, type BaseShooterCtorParams, type SportHasClassifications, type SportHasDivisions } from "./base.js";
declare const classes: readonly ["DM", "MA", "EX", "SS", "MM", "NV", "UN"];
declare const divisions: readonly ["CDP", "ESP", "SSP", "CCP", "CO", "REV", "BUG", "PCC"];
export declare class IDPA extends BaseSport implements SportHasClassifications<typeof classes>, SportHasDivisions<typeof divisions> {
    static readonly name: string;
    readonly classifications: readonly ["DM", "MA", "EX", "SS", "MM", "NV", "UN"];
    readonly divisions: readonly ["CDP", "ESP", "SSP", "CCP", "CO", "REV", "BUG", "PCC"];
}
export declare class IDPAShooter extends BaseShooter {
    sport: Sport;
    divisionsClassifications: Record<(typeof divisions)[number] | string, (typeof classes)[number] | string>;
    constructor(data: BaseShooterCtorParams & {
        divisionsClassifications: InstanceType<typeof IDPAShooter>["divisionsClassifications"];
    });
}
export {};
