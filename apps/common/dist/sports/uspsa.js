import { BaseShooter, BaseSport, } from "./base.js";
const classes = ["GM", "M", "A", "B", "C", "D", "U"];
const divisions = [
    "Pistol - Open",
    "Pistol - Limited",
    "Pistol - Limited-10",
    "Pistol - Production",
    "Pistol - Single-Stack",
    "Pistol - Revolver",
    "Pistol - Carry Optics",
    "Pistol - Pistol Caliber Carbine",
    "Pistol - Limited Optics",
    "Rifle - Open",
    "Rifle - Tactical",
    "Rifle - Limited",
    "Shotgun - Open",
    "Shotgun - Limited/Tactical",
    "Shotgun - Heavy Metal",
    "Multigun - Open",
    "Multigun - Tactical",
    "Multigun - Limited",
    "Multigun - Heavy Metal Tactical",
    "Multigun - Heavy Metal Limited Tactical",
    "Multigun - Modified",
];
export class USPSA extends BaseSport {
    static name = "USPSA";
    classifications = classes;
    divisions = divisions;
}
export class USPSAShooter extends BaseShooter {
    sport = "USPSA";
    divisionsClassifications;
    constructor(data) {
        super(data);
        this.divisionsClassifications = data.divisionsClassifications;
    }
}
