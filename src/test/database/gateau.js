import {cols} from "../../main/const/collections";
import {vitBFacetEntry, vitCFacetEntry} from "./facetEntries";
import {withItem, withQuantity} from "../testPlumbing";
import {vitBImpactEntry, vitCImpactEntry} from "./impactEntries";

export const gateau = {_id: "5a6a03c03e77667641d2d2c3", name: "Gateau au chocolat", name_lower: "gateau au chocolat", ...withQuantity(200, "g")};
export const farine = {_id: "5a6a03c03e77667641d2d2c1", name: "Farine", name_lower: "farine"};
export const lait = {_id: "5a6a03c03e77667641d2d2c2", name: "Lait", name_lower: "lait"};
export const ble = {_id: "5a6a03c03e77667641d2d2c0", name: "blé", name_lower: "blé"};

const gateauItem = withItem(gateau._id, 500, "g");
const farineItem = withItem(farine._id, 150, "g");
const laitItem = withItem(lait._id, 20, "L");

export const gateauRoot = {...gateauItem, items: [farineItem, laitItem]};
export const farineRoot = {_id: farine._id, items: [{_id: ble._id}]};
export const farineBranch = {...farineItem, items: [gateauItem]};
export const laitBranch = {...laitItem, items: [gateauItem]};
export const bleBranch = {_id: ble._id, items: [{_id: farine._id}]};

const gateauFacets = {
    _id: gateau._id,
    items: [
        withItem(vitCFacetEntry._id, 10, "mol"),
        withItem(vitBFacetEntry._id, 100, "mmol")
    ]
};
export const bleFacets = {
    ...withItem(ble._id, 10, "kg"),
    items: [
        withItem(vitCFacetEntry._id, 6, "mol"),
        withItem(vitBFacetEntry._id, 150, "mmol")
    ]
};
const gateauImpact = {
    _id: gateau._id,
    items: [
        withItem(vitCImpactEntry._id, 10, "mol"),
        withItem(vitBImpactEntry._id, 100, "mmol")
    ]
};
export const bleImpacts = {
    ...withItem(ble._id, 10, "kg"),
    items: [
        withItem(vitCImpactEntry._id, 6, "mol"),
        withItem(vitBImpactEntry._id, 150, "mmol")
    ]
};

export const database = {
    [cols.TRUNK]: [gateau, lait, farine, ble],
    [cols.BRANCH]: [laitBranch, farineBranch, bleBranch],
    [cols.ROOT]: [gateauRoot, farineRoot],
    [cols.FACET]: [gateauFacets, bleFacets],
    [cols.IMPACT]: [gateauImpact, bleImpacts]
};