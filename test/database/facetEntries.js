import {cols} from "../../src/const/collections";
import {withEntry} from "trees-test/dist/domain";

export const vitBFacetEntry = withEntry("5a6a03c03e77667641d2d2c5", "vitamine B", "Dens");
export const vitCFacetEntry = withEntry("5a6a03c03e77667641d2d2c4", "vitamine C", "Dens");
export const vitDFacetEntry = withEntry("5a6a03c03e77667641d2d2c7", "vitamine D", "Dens");
export const vitEFacetEntry = withEntry("5a6a03c03e77667641d2d2c8", "vitamine E", "Dens");
export const prixFacetEntry = withEntry("5a6a03c03e77667641d2d2c6", "Prix", "Prix");
export const poidsFacetEntry = withEntry("5a6a03c03e77667641d2d2c9", "Poids", "Mass");

export const database = {
    [cols.FACET_ENTRY]: [vitDFacetEntry, vitEFacetEntry, vitCFacetEntry, vitBFacetEntry, prixFacetEntry, poidsFacetEntry]
};
