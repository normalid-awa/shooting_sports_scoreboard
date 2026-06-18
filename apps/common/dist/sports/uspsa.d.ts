import type { Sport } from "../sports.js";
import { BaseShooter, BaseSport, type BaseShooterCtorParams, type SportHasClassifications, type SportHasDivisions } from "./base.js";
declare const classes: readonly ["GM", "M", "A", "B", "C", "D", "U"];
declare const divisions: readonly ["Pistol - Open", "Pistol - Limited", "Pistol - Limited-10", "Pistol - Production", "Pistol - Single-Stack", "Pistol - Revolver", "Pistol - Carry Optics", "Pistol - Pistol Caliber Carbine", "Pistol - Limited Optics", "Rifle - Open", "Rifle - Tactical", "Rifle - Limited", "Shotgun - Open", "Shotgun - Limited/Tactical", "Shotgun - Heavy Metal", "Multigun - Open", "Multigun - Tactical", "Multigun - Limited", "Multigun - Heavy Metal Tactical", "Multigun - Heavy Metal Limited Tactical", "Multigun - Modified"];
export declare class USPSA extends BaseSport implements SportHasClassifications<typeof classes>, SportHasDivisions<typeof divisions> {
    static readonly name: string;
    readonly classifications: readonly ["GM", "M", "A", "B", "C", "D", "U"];
    readonly divisions: readonly ["Pistol - Open", "Pistol - Limited", "Pistol - Limited-10", "Pistol - Production", "Pistol - Single-Stack", "Pistol - Revolver", "Pistol - Carry Optics", "Pistol - Pistol Caliber Carbine", "Pistol - Limited Optics", "Rifle - Open", "Rifle - Tactical", "Rifle - Limited", "Shotgun - Open", "Shotgun - Limited/Tactical", "Shotgun - Heavy Metal", "Multigun - Open", "Multigun - Tactical", "Multigun - Limited", "Multigun - Heavy Metal Tactical", "Multigun - Heavy Metal Limited Tactical", "Multigun - Modified"];
}
export declare class USPSAShooter extends BaseShooter {
    sport: Sport;
    divisionsClassifications: Record<(typeof divisions)[number] | string, (typeof classes)[number] | string>;
    constructor(data: BaseShooterCtorParams & {
        divisionsClassifications: InstanceType<typeof USPSAShooter>["divisionsClassifications"];
    });
}
export {};
