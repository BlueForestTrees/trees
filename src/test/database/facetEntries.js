import {cols} from "../../main/const/collections";
import {withEntry} from "../util/testUtil";

console.log(withEntry)
export const vitBFacetEntry = withEntry("5a6a03c03e77667641d2d2c5", "vitamine B", "Densité");
export const vitCFacetEntry = withEntry("5a6a03c03e77667641d2d2c4", "vitamine C", "Densité");
export const vitDFacetEntry = withEntry("5a6a03c03e77667641d2d2c7", "vitamine D", "Densité");
export const vitEFacetEntry = withEntry("5a6a03c03e77667641d2d2c8", "vitamine E", "Densité");
export const prixFacetEntry = withEntry("5a6a03c03e77667641d2d2c6", "Prix", "Coût");

export const database = {
    [cols.FACET_ENTRY]: [vitDFacetEntry, vitEFacetEntry, vitCFacetEntry, vitBFacetEntry, prixFacetEntry]
};
