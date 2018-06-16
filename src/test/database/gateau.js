import {cols} from "../../main/const/collections";
import {vitBFacetEntry, vitCFacetEntry} from "./facetEntries";
import {withIdQuantity, withTrunk, withTrunkNoQt} from "../util/testUtil";
import {vitBImpactEntry, vitCImpactEntry} from "./impactEntries";

export const gateauTrunk = withTrunk("Gateau au chocolat", "5a6a03c03e77667641d2d2c3", 200, "g");
export const farineTrunk = withTrunkNoQt("Farine", "5a6a03c03e77667641d2d2c1");
export const laitTrunk = withTrunkNoQt("Lait", "5a6a03c03e77667641d2d2c2");
export const bleTrunk = withTrunkNoQt("blé", "5a6a03c03e77667641d2d2c0");
export const pizzaTrunk = withTrunkNoQt("pizza", "5a6a03c03e77667641d2d2c4");
export const cremeTrunk = withTrunkNoQt("creme", "5a6a03c03e77667641d2d2c5");

export const gateauItem = withIdQuantity(gateauTrunk._id, 500, "g");
const pizzaItem = withIdQuantity(pizzaTrunk._id, 500, "g");
const farineItem = withIdQuantity(farineTrunk._id, 200, "g");
const laitItem = withIdQuantity(laitTrunk._id, 20, "L");

export const gateauRoot = {...gateauItem, items: [farineItem, laitItem]};
export const pizzaRoot = {...pizzaItem, items: [farineItem]};
export const farineRoot = {_id: farineTrunk._id, items: [{_id: bleTrunk._id}]};
export const cremeRoot = {_id: cremeTrunk._id, items: [{_id: laitTrunk._id}]};

export const farineBranch = {...farineItem, items: [gateauItem, pizzaItem]};
export const laitBranch = {...laitItem, items: [{_id: cremeTrunk._id}, gateauItem]};
export const bleBranch = {_id: bleTrunk._id, items: [{_id: farineTrunk._id}]};

const gateauFacets = {_id: gateauTrunk._id, items: [withIdQuantity(vitCFacetEntry._id, 10, "mol"), withIdQuantity(vitBFacetEntry._id, 100, "mmol")]};
export const bleFacets = {...withIdQuantity(bleTrunk._id, 10, "kg"), items: [withIdQuantity(vitCFacetEntry._id, 6, "mol"), withIdQuantity(vitBFacetEntry._id, 150, "mmol")]};

const gateauImpact = {...withIdQuantity(gateauTrunk._id, 500, "g"), items: [withIdQuantity(vitCImpactEntry._id, 10, "mol"), withIdQuantity(vitBImpactEntry._id, 100, "mmol")]};
export const bleImpacts = {...withIdQuantity(bleTrunk._id, 10, "kg"), items: [withIdQuantity(vitCImpactEntry._id, 6, "mol"), withIdQuantity(vitBImpactEntry._id, 150, "mmol")]};

export const database = {
    [cols.TRUNK]: [gateauTrunk, laitTrunk, farineTrunk, bleTrunk, pizzaTrunk, cremeTrunk],
    [cols.BRANCH]: [laitBranch, farineBranch, bleBranch],
    [cols.ROOT]: [gateauRoot, farineRoot, pizzaRoot, cremeRoot],
    [cols.FACET]: [gateauFacets, bleFacets],
    [cols.IMPACT]: [gateauImpact, bleImpacts]
};