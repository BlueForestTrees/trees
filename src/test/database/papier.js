import {cols} from "../../main/const/collections";
import {withItem, withTrunk, withTrunkAuto} from "../testPlumbing";
import {co2eImpactEntry} from "./impactEntries";

export const papierVA = withTrunk("papier version A", "111111111111111111111111", 100, "m2");
const papierVB = withTrunk("papier version B", "222222222222222222222222", 50, "m2");
export const couchePE = withTrunk("couche Plastique Polyéthylène", "333333333333333333333333", 1, "t");
export const couchePapier = withTrunk("couche Papier", "444444444444444444444444", 1, "t");
export const coucheAdhesif = withTrunk("couche Adhésif", "555555555555555555555555", 1, "t");
export const coucheAlu = withTrunk("couche Alu", "666666666666666666666666", 1, "t");

const papierVAItem = withItem(papierVA._id, 100, "m2");
const papierVBItem = withItem(papierVB._id, 100, "m2");
const couchePEItem = withItem(couchePE._id, 780, "kg");
const couchePapierItem = withItem(couchePapier._id, 2070, "kg");
const coucheAdhesifItem = withItem(coucheAdhesif._id, 80, "kg");
const coucheAluItem = withItem(coucheAlu._id, 890, "kg");

const papierVARoot = {...papierVAItem, items: [couchePEItem, couchePapierItem, coucheAdhesifItem, coucheAluItem]};
const papierVBRoot = {...papierVBItem, items: [couchePEItem, couchePapierItem, coucheAdhesifItem]};

const couchePEBranch = {...couchePEItem, items: [papierVAItem, papierVBItem]};
const couchePapierBranch = {...couchePapierItem, items: [papierVAItem, papierVBItem]};
const coucheAdhesifBranch = {...coucheAdhesifItem, items: [papierVAItem, papierVBItem]};
const coucheAluBranch = {...coucheAluItem, items: [papierVAItem]};

const couchePEImpact = {...withItem(couchePE._id, 1, "t"), items: [withItem(co2eImpactEntry._id, 1920.512820513, "kg")]};
const couchePapierImpact = {...withItem(couchePapier._id, 1, "t"), items: [withItem(co2eImpactEntry._id, 410.144927536, "kg")]};
const coucheAdhesifImpact = {...withItem(coucheAdhesif._id, 1, "kg"), items: [withItem(co2eImpactEntry._id, 7.45, "kg")]};
const coucheAluImpact = {...withItem(coucheAlu._id, 1, "t"), items: [withItem(co2eImpactEntry._id, 9834.831460674, "kg")]};

export const database = {
    [cols.TRUNK]: [papierVA, papierVB, coucheAdhesif, coucheAlu, couchePapier, couchePE],
    [cols.ROOT]: [papierVARoot, papierVBRoot],
    [cols.IMPACT]: [couchePEImpact, couchePapierImpact, coucheAdhesifImpact, coucheAluImpact],
    [cols.BRANCH]: [couchePEBranch, coucheAdhesifBranch, coucheAluBranch, couchePapierBranch]
};
