import {cols} from "../../main/const/collections";

export const vitCFacetEntry = {
    _id: "5a6a03c03e77667641d2d2c4",
    name: "vitamine C",
    grandeur: "Densité"
};
export const vitBFacetEntry = {
    _id: "5a6a03c03e77667641d2d2c5",
    name: "vitamine B",
    grandeur: "Densité"
};
export const prixFacetEntry = {
    _id: "5a6a03c03e77667641d2d2c6",
    name: "Prix",
    grandeur: "Coût"
};

export const database =  {
    [cols.FACET_ENTRY]: [vitCFacetEntry, vitBFacetEntry, prixFacetEntry]
};