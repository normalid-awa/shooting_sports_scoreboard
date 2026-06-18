import { BaseShooter, BaseSport, } from "./base.js";
const classes = ["GM", "M", "A", "B", "C", "U"];
const divisions = [
    "Handgun - Standard",
    "Handgun - Open",
    "Handgun - Classic",
    "Handgun - Production",
    "Handgun - Production Optic",
    "Rifle - Semi Auto Open",
    "Rifle - Semi Auto Standard",
    "PCC - Optics",
    "PCC - Iron",
];
export class AAIPSC extends BaseSport {
    static name = "AAIPSC";
    classifications = classes;
    divisions = divisions;
}
export class AAIPSCShooter extends BaseShooter {
    sport = "AAIPSC";
    divisionsClassifications;
    constructor(data) {
        super(data);
        this.divisionsClassifications = data.divisionsClassifications;
    }
}
