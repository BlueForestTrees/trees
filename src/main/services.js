import {loadUnitsData} from "./service/unit/grandeurService";
import {hey, saloute} from "trees-common/dist";
import {getShortnames, initUnits} from "trees-common/dist/units";
import {debug} from "./util/debug";

export const initServices = () => {

    initUnitsEtGrandeurs();

};

const initUnitsEtGrandeurs = () =>
    loadUnitsData()
        .then(initUnits)
        .then(() => debug(saloute))
        .then(() => debug(hey()));