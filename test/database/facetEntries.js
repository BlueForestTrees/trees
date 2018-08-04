import {cols} from "../../src/const/collections"
import {withEntry} from "test-api-express-mongo/dist/domain"

export const vitBFacetEntry = withEntry("vitamine B", "Dens")
export const vitCFacetEntry = withEntry("vitamine C", "Dens")
export const vitDFacetEntry = withEntry("vitamine D", "Dens")
export const vitEFacetEntry = withEntry("vitamine E", "Dens")
export const prixFacetEntry = withEntry("Prix", "Prix")
export const poidsFacetEntry = withEntry("Poids", "Mass")

export const database = {
    [cols.FACET_ENTRY]: [vitDFacetEntry, vitEFacetEntry, vitCFacetEntry, vitBFacetEntry, prixFacetEntry, poidsFacetEntry]
}
