import {loadUnitsData} from "./service/unit/grandeurService";
import {hey, saloute} from "trees-common/dist";
import {getShortnames, initUnits, getGrandeursKeys} from "trees-common/dist";

export const initServices = () => {
    initUnitsEtGrandeurs();
};

const initUnitsEtGrandeurs = () =>
    loadUnitsData()
        .then(initUnits)
        .then(()=>console.log(`Unités et grandeurs: ${getShortnames().length} unités dans ${getGrandeursKeys().length} grandeurs`));