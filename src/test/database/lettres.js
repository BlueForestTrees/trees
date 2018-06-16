import {withIdQuantity, withTrunk} from "../util/testUtil";
import {cols} from "../../main/const/collections";
import {prixFacetEntry, vitBFacetEntry, vitCFacetEntry, vitEFacetEntry} from "./facetEntries";
import {co2eImpactEntry, prixImpactEntry, vitBImpactEntry, vitCImpactEntry, vitDImpactEntry} from "./impactEntries";

export const aTrunk = withTrunk("a", "aaaaaaaaaaaaaaaaaaaaaaaa", 1, "kg");
const bTrunk = withTrunk("b", "bbbbbbbbbbbbbbbbbbbbbbbb", 1, "kg");
const cTrunk = withTrunk("c", "cccccccccccccccccccccccc", 1, "kg");
const dTrunk = withTrunk("d", "dddddddddddddddddddddddd", 1, "kg");
const baTrunk = withTrunk("ba", "babababababababababababa", 1, "kg");
const b2Trunk = withTrunk("b2", "b2b2b2b2b2b2b2b2b2b2b2b2", 1, "kg");
export const daTrunk = withTrunk("da", "dadadadadadadadadadadada", 1, "kg");
export const dbTrunk = withTrunk("db", "dbdbdbdbdbdbdbdbdbdbdbdb", 1, "kg");
const baaTrunk = withTrunk("baa", "baabaabaabaabaabaabaabaa", 1, "kg");
const babTrunk = withTrunk("bab", "babbabbabbabbabbabbabbab", 1, "kg");
const dbaTrunk = withTrunk("dba", "dbadbadbadbadbadbadbadba", 1, "kg");
const dbaaTrunk = withTrunk("dbaa", "dbaadbaadbaadbaadbaadbaa", 1, "kg");
export const e1Trunk = withTrunk("eau", "e1e1e1e1e1e1e1e1e1e1e1e1", 1, "m3");
export const e2Trunk = withTrunk("elec", "e2e2e2e2e2e2e2e2e2e2e2e2", 1, "kg");

const aRoot = {...withIdQuantity(aTrunk._id, 1, "kg"), items: [withIdQuantity(bTrunk._id, 1, "kg"), withIdQuantity(cTrunk._id, 1, "kg"), withIdQuantity(dTrunk._id, 1, "kg")]};
const bRoot = {...withIdQuantity(bTrunk._id, 1, "kg"), items: [withIdQuantity(baTrunk._id, 1, "kg"), withIdQuantity(b2Trunk._id, 1, "kg")]};
const baRoot = {...withIdQuantity(baTrunk._id, 1, "kg"), items: [withIdQuantity(baaTrunk._id, 1, "kg"), withIdQuantity(babTrunk._id, 1, "kg")]};
const baaRoot = {...withIdQuantity(baaTrunk._id, 1, "kg"), items: [withIdQuantity(e1Trunk._id, 10, "L")]};
const babRoot = {...withIdQuantity(babTrunk._id, 1, "kg"), items: [withIdQuantity(e1Trunk._id, 0.5, "m3")]};
const b2Root = {...withIdQuantity(b2Trunk._id, 1, "kg"), items: [withIdQuantity(e2Trunk._id, 1, "kg")]};
const cRoot = {...withIdQuantity(cTrunk._id, 1, "kg"), items: [withIdQuantity(e2Trunk._id, 1, "kg")]};
export const dRoot = {...withIdQuantity(dTrunk._id, 1, "kg"), items: [withIdQuantity(daTrunk._id, 1, "kg"), withIdQuantity(dbTrunk._id, 1, "kg")]};
const daRoot = {...withIdQuantity(daTrunk._id, 1, "kg"), items: [withIdQuantity(e2Trunk._id, 1, "kg")]};
const dbRoot = {...withIdQuantity(dbTrunk._id, 1, "kg"), items: [withIdQuantity(dbaTrunk._id, 1, "kg")]};
const dbaRoot = {...withIdQuantity(dbaTrunk._id, 1, "kg"), items: [withIdQuantity(dbaaTrunk._id, 1, "kg")]};
const dbaaRoot = {...withIdQuantity(dbaaTrunk._id, 1, "kg"), items: [withIdQuantity(e2Trunk._id, 2, "kg")]};


const bBranch = {...withIdQuantity(bTrunk._id, 1, "kg"), items: [withIdQuantity(aTrunk._id, 1, "kg")]};
const baBranch = {...withIdQuantity(baTrunk._id, 1, "kg"), items: [withIdQuantity(bTrunk._id, 1, "kg")]};
const baaBranch = {...withIdQuantity(baaTrunk._id, 1, "kg"), items: [withIdQuantity(baTrunk._id, 1, "kg")]};
const babBranch = {...withIdQuantity(babTrunk._id, 1, "kg"), items: [withIdQuantity(baTrunk._id, 1, "kg")]};
const b2Branch = {...withIdQuantity(b2Trunk._id, 1, "kg"), items: [withIdQuantity(bTrunk._id, 1, "kg")]};
const cBranch = {...withIdQuantity(cTrunk._id, 1, "kg"), items: [withIdQuantity(aTrunk._id, 1, "kg")]};
const dBranch = {...withIdQuantity(dTrunk._id, 1, "kg"), items: [withIdQuantity(aTrunk._id, 1, "kg")]};
const daBranch = {...withIdQuantity(daTrunk._id, 1, "kg"), items: [withIdQuantity(dTrunk._id, 1, "kg")]};
const dbBranch = {...withIdQuantity(dbTrunk._id, 1, "kg"), items: [withIdQuantity(dTrunk._id, 1, "kg")]};
const dbaBranch = {...withIdQuantity(dbaTrunk._id, 1, "kg"), items: [withIdQuantity(dbTrunk._id, 1, "kg")]};
const dbaaBranch = {...withIdQuantity(dbaaTrunk._id, 1, "kg"), items: [withIdQuantity(dbaTrunk._id, 1, "kg")]};
const e1Branch = {...withIdQuantity(e1Trunk._id, 500, "L"), items: [withIdQuantity(baaTrunk._id, 50, "kg"), withIdQuantity(babTrunk._id, 1, "kg")]};
const e2Branch = {...withIdQuantity(e2Trunk._id, 1, "kg"), items: [withIdQuantity(b2Trunk._id, 1, "kg"), withIdQuantity(cTrunk._id, 1, "kg"), withIdQuantity(daTrunk._id, 1, "kg"), withIdQuantity(dbaaTrunk._id, 500, "g")]};


const aFacets = {...withIdQuantity(aTrunk._id, 1, "kg"), items: [withIdQuantity(prixFacetEntry._id, 100, "€"), withIdQuantity(vitCFacetEntry._id, 10, "mol"), withIdQuantity(vitBFacetEntry._id, 100, "mmol"), withIdQuantity(vitEFacetEntry._id, 120, "mmol")]};
const bFacets = {_id: bTrunk._id, items: [withIdQuantity(prixFacetEntry._id, 40, "€"), withIdQuantity(vitCFacetEntry._id, 6, "mol"), withIdQuantity(vitBFacetEntry._id, 60, "mmol"), withIdQuantity(vitEFacetEntry._id, 80, "mmol")]};

const aImpacts = {...withIdQuantity(aTrunk._id, 1, "kg"), items: [withIdQuantity(prixImpactEntry._id, 100, "€"), withIdQuantity(vitCImpactEntry._id, 10, "mol"), withIdQuantity(vitBImpactEntry._id, 100, "mmol"), withIdQuantity(co2eImpactEntry._id, 120, "mmol")]};
const bImpacts = {_id: bTrunk._id, items: [withIdQuantity(prixImpactEntry._id, 40, "€"), withIdQuantity(vitCImpactEntry._id, 6, "mol"), withIdQuantity(vitBImpactEntry._id, 60, "mmol"), withIdQuantity(vitDImpactEntry._id, 80, "mmol")]};

export const database = {
    [cols.TRUNK]: [aTrunk, bTrunk, cTrunk, dTrunk, baTrunk, b2Trunk, daTrunk, dbTrunk, baaTrunk, babTrunk, dbaTrunk, dbaaTrunk, e1Trunk, e2Trunk],
    [cols.ROOT]: [aRoot, bRoot, baRoot, baaRoot, babRoot, b2Root, cRoot, dRoot, daRoot, dbRoot, dbaRoot, dbaaRoot],
    [cols.FACET]: [aFacets, bFacets],
    [cols.IMPACT]: [aImpacts, bImpacts],
    [cols.BRANCH]: [bBranch, baBranch, baaBranch, babBranch, b2Branch, cBranch, dBranch, daBranch, dbBranch, dbaBranch, dbaaBranch, e1Branch, e2Branch]
};