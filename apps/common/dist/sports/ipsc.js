import { BaseShooter, BaseSport, } from "./base.js";
const classes = ["GM", "M", "A", "B", "C", "D", "U"];
const divisions = [
    "Handgun - Open",
    "Handgun - Standard",
    "Handgun - Classic",
    "Handgun - Production",
    "Handgun - Production Optics",
    "Handgun - Revolver",
    "Handgun - Optics",
    "Rifle - Semi Auto Open",
    "Rifle - Semi Auto Standard",
    "Rifle - Manual Action Contemporary",
    "Rifle - Manual Action Bolt",
    "Shotgun - Open",
    "Shotgun - Modified",
    "Shotgun - Standard",
    "Shotgun - Standard Manual",
    "PCC - Optics",
    "PCC - Iron",
];
export class IPSC extends BaseSport {
    static name = "IPSC";
    classifications = classes;
    divisions = divisions;
}
export class IPSCShooter extends BaseShooter {
    sport = "IPSC";
    divisionsClassifications;
    constructor(data) {
        super(data);
        this.divisionsClassifications = data.divisionsClassifications;
    }
}
