import { BaseShooter, BaseSport, } from "./base.js";
const divisions = [
    "Unlimited",
    "Practical",
    "Practical 308",
    "Factory ",
    "Heavy",
];
export class ThreeGun extends BaseSport {
    static name = "3-Gun";
    divisions = divisions;
}
export class ThreeGunShooter extends BaseShooter {
    sport = "3-Guns";
    divisions;
    constructor(data) {
        super(data);
        this.divisions = data.divisions;
    }
}
