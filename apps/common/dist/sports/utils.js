import { ThreeGun } from "./3gun.js";
import { AAIPSC } from "./aaipsc.js";
import { IDPA } from "./idpa.js";
import { IPSC } from "./ipsc.js";
import { USPSA } from "./uspsa.js";
export function getSportFromSportEnum(sport) {
    switch (sport) {
        case "3-Guns":
            return ThreeGun;
        case "AAIPSC":
            return AAIPSC;
        case "IDPA":
            return IDPA;
        case "IPSC":
            return IPSC;
        case "USPSA":
            return USPSA;
    }
}
