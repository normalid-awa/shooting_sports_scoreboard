import { BaseShooter, BaseSport, } from "./base.js";
const classes = ["DM", "MA", "EX", "SS", "MM", "NV", "UN"];
const divisions = [
    "CDP",
    "ESP",
    "SSP",
    "CCP",
    "CO",
    "REV",
    "BUG",
    "PCC",
];
export class IDPA extends BaseSport {
    static name = "IDPA";
    classifications = classes;
    divisions = divisions;
}
export class IDPAShooter extends BaseShooter {
    sport = "IDPA";
    divisionsClassifications;
    constructor(data) {
        super(data);
        this.divisionsClassifications = data.divisionsClassifications;
    }
}
