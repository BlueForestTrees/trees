import {loadUnitsData} from "./service/unit/grandeurService"
import {getGrandeursKeys, getShortnames, initUnits} from "trees-units"

export const initServices = async () => {
    console.log("Init services...")
    await initUnitsEtGrandeurs()
}

const initUnitsEtGrandeurs = () =>
    loadUnitsData()
        .then(initUnits)
        .then(() => console.log(`Unités et grandeurs: ${getShortnames().length} unités dans ${getGrandeursKeys().length} grandeurs`))