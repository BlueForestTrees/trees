import {loadUnitsData} from "./service/unit/grandeurService";
import {getShortnames, initUnits, getGrandeursKeys} from "trees-common/dist";

export const initServices = () => {
    console.log("Init services...");
    initUnitsEtGrandeurs();
};

const initUnitsEtGrandeurs = () =>
    loadUnitsData()
        .then(initUnits)
        .then(()=>console.log(`Unités et grandeurs: ${getShortnames().length} unités dans ${getGrandeursKeys().length} grandeurs`));