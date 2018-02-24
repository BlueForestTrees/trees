import {cols} from "../../main/const/collections";

export const vitCImpactEntry = {
    _id: "5a6a03c03e77667641d2d2c4",
    name: "Ivitamine C",
    grandeur: "Densité"
};
export const vitBImpactEntry = {
    _id: "5a6a03c03e77667641d2d2c5",
    name: "Ivitamine B",
    grandeur: "Densité"
};
export const prixImpactEntry = {
    _id: "5a6a03c03e77667641d2d2c6",
    name: "IPrix",
    grandeur: "Coût"
};
export const vitDImpactEntry = {
    _id: "5a6a03c03e77667641d2d2c7",
    name: "Ivitamine D",
    grandeur: "Densité"
};
export const vitEImpactEntry = {
    _id: "5a6a03c03e77667641d2d2c8",
    name: "Ivitamine E",
    grandeur: "Densité"
};
export const co2eImpact = {
    _id: "5a6a03c03e77667641d2d2c9",
    name: "équivalent CO2",
    grandeur: "Masse"
};

export const database = {
    [cols.IMPACT_ENTRY]: [vitDImpactEntry, vitEImpactEntry, co2eImpact, vitCImpactEntry, vitBImpactEntry, prixImpactEntry]
};