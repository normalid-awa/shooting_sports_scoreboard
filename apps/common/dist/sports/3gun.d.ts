import type { Sport } from "../sports.js";
import { BaseShooter, BaseSport, type BaseShooterCtorParams, type SportHasDivisions } from "./base.js";
declare const divisions: readonly ["Unlimited", "Practical", "Practical 308", "Factory ", "Heavy"];
export declare class ThreeGun extends BaseSport implements SportHasDivisions<typeof divisions> {
    static readonly name: string;
    readonly divisions: readonly ["Unlimited", "Practical", "Practical 308", "Factory ", "Heavy"];
}
export declare class ThreeGunShooter extends BaseShooter {
    sport: Sport;
    divisions: ((typeof divisions)[number] | string)[];
    constructor(data: BaseShooterCtorParams & {
        divisions: InstanceType<typeof ThreeGunShooter>["divisions"];
    });
}
export {};
