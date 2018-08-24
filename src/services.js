import {loadUnitsData} from "./service/unit/grandeurService"
import {getGrandeursKeys, getShortnames, initUnits} from "unit-manip"

const debug = require('debug')('api:tree')

export const initServices = async () => {
    debug("Init services...")
    await initUnitsEtGrandeurs()
}

const initUnitsEtGrandeurs = () =>
    loadUnitsData()
        .then(initUnits)
        .then(() => debug(`Unités et grandeurs: ${getShortnames().length} unités dans ${getGrandeursKeys().length} grandeurs`))