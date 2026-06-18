export class BaseSport {
    static name;
}
export function isSportHasClassifications(sport) {
    return "classifications" in sport && Array.isArray(sport.classifications);
}
export function isSportHasDivisions(sport) {
    return "divisions" in sport && Array.isArray(sport.divisions);
}
export class BaseShooter {
    id;
    name;
    region;
    identifier;
    createdAt;
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.region = data.region;
        this.identifier = data.identifier;
        this.createdAt = data.createdAt;
    }
}
