import type { RegionalCode } from "../regionalCode.js";
import type { Sport } from "../sports.js";

export abstract class BaseSport {
	static readonly name: string;
}

export interface SportHasClassifications<
	Classifications extends readonly string[],
> {
	readonly classifications: Classifications;
}

export function isSportHasClassifications<T extends BaseSport>(
	sport: T,
): sport is T & SportHasClassifications<any> {
	return "classifications" in sport && Array.isArray(sport.classifications);
}

export interface SportHasDivisions<Divisions extends readonly string[]> {
	readonly divisions: Divisions;
}

export function isSportHasDivisions<T extends BaseSport>(
	sport: T,
): sport is T & SportHasDivisions<any> {
	return "divisions" in sport && Array.isArray(sport.divisions);
}

export type BaseShooterCtorParams = Omit<BaseShooter, "sport">;

export abstract class BaseShooter {
	abstract readonly sport: Sport;
	readonly id: string;
	name: string;
	region: RegionalCode;
	identifier: string;
	createdAt: Date;

	constructor(data: BaseShooterCtorParams) {
		this.id = data.id;
		this.name = data.name;
		this.region = data.region;
		this.identifier = data.identifier;
		this.createdAt = data.createdAt;
	}
}
