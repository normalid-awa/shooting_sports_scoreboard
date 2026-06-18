import type { RegionalCode } from "../regionalCode.js";
import type { Sport } from "../sports.js";
export declare abstract class BaseSport {
    static readonly name: string;
}
export interface SportHasClassifications<Classifications extends readonly string[]> {
    readonly classifications: Classifications;
}
export declare function isSportHasClassifications<T extends BaseSport>(sport: T): sport is T & SportHasClassifications<any>;
export interface SportHasDivisions<Divisions extends readonly string[]> {
    readonly divisions: Divisions;
}
export declare function isSportHasDivisions<T extends BaseSport>(sport: T): sport is T & SportHasDivisions<any>;
export type BaseShooterCtorParams = Omit<BaseShooter, "sport">;
export declare abstract class BaseShooter {
    abstract readonly sport: Sport;
    readonly id: string;
    name: string;
    region: RegionalCode;
    identifier: string;
    createdAt: Date;
    constructor(data: BaseShooterCtorParams);
}
