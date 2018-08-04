import {cols} from "../../src/const/collections"
import {withEntry} from "test-api-express-mongo/dist/domain"


export const vitCImpactEntry = withEntry("5a6a03c03e77667641d2d2c4", "Ivitamine C", "Dens")
export const vitBImpactEntry = withEntry("5a6a03c03e77667641d2d2c5", "Ivitamine B", "Dens")
export const prixImpactEntry = withEntry("5a6a03c03e77667641d2d2c6", "IPrix", "Coût")
export const vitDImpactEntry = withEntry("5a6a03c03e77667641d2d2c7", "Ivitamine D",  "Dens")
export const vitEImpactEntry = withEntry("5a6a03c03e77667641d2d2c8", "Ivitamine E",  "Dens")
export const co2eImpactEntry = withEntry("5a6a03c03e77667641d2d2c9", "équivalent CO2",  "Mass")

export const database = {
    [cols.IMPACT_ENTRY]: [vitDImpactEntry, vitEImpactEntry, co2eImpactEntry, vitCImpactEntry, vitBImpactEntry, prixImpactEntry]
}
