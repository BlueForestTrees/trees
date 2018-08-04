import {cols} from "../../src/const/collections"
import {withEntry} from "test-api-express-mongo/dist/domain"


export const vitCImpactEntry = withEntry("Ivitamine C", "Dens")
export const vitBImpactEntry = withEntry("Ivitamine B", "Dens")
export const prixImpactEntry = withEntry("IPrix", "Coût")
export const vitDImpactEntry = withEntry("Ivitamine D",  "Dens")
export const vitEImpactEntry = withEntry("Ivitamine E",  "Dens")
export const co2eImpactEntry = withEntry("équivalent CO2",  "Mass")

export const database = {
    [cols.IMPACT_ENTRY]: [vitDImpactEntry, vitEImpactEntry, co2eImpactEntry, vitCImpactEntry, vitBImpactEntry, prixImpactEntry]
}
