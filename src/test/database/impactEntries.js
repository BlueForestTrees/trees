import {cols} from "../../main/const/collections";
import {withEntry} from "../util/testIntegApp";


export const vitCImpactEntry = withEntry( "5a6a03c03e77667641d2d2c4", "Ivitamine C", "Densité");
export const vitBImpactEntry = withEntry( "5a6a03c03e77667641d2d2c5", "Ivitamine B", "Densité");
export const prixImpactEntry = withEntry( "5a6a03c03e77667641d2d2c6", "IPrix", "Coût");
export const vitDImpactEntry = withEntry( "5a6a03c03e77667641d2d2c7", "Ivitamine D",  "Densité");
export const vitEImpactEntry = withEntry( "5a6a03c03e77667641d2d2c8", "Ivitamine E",  "Densité");
export const co2eImpactEntry = withEntry( "5a6a03c03e77667641d2d2c9", "équivalent CO2",  "Masse");

export const database = {
    [cols.IMPACT_ENTRY]: [vitDImpactEntry, vitEImpactEntry, co2eImpactEntry, vitCImpactEntry, vitBImpactEntry, prixImpactEntry]
};
