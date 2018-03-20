import {withItem, withTrunk} from "../util/testIntegApp";
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

const aRoot = {...withItem(aTrunk._id, 1, "kg"), items: [withItem(bTrunk._id, 1, "kg"), withItem(cTrunk._id, 1, "kg"), withItem(dTrunk._id, 1, "kg")]};
const bRoot = {...withItem(bTrunk._id, 1, "kg"), items: [withItem(baTrunk._id, 1, "kg"), withItem(b2Trunk._id, 1, "kg")]};
const baRoot = {...withItem(baTrunk._id, 1, "kg"), items: [withItem(baaTrunk._id, 1, "kg"), withItem(babTrunk._id, 1, "kg")]};
const baaRoot = {...withItem(baaTrunk._id, 1, "kg"), items: [withItem(e1Trunk._id, 10, "L")]};
const babRoot = {...withItem(babTrunk._id, 1, "kg"), items: [withItem(e1Trunk._id, 0.5, "m3")]};
const b2Root = {...withItem(b2Trunk._id, 1, "kg"), items: [withItem(e2Trunk._id, 1, "kg")]};
const cRoot = {...withItem(cTrunk._id, 1, "kg"), items: [withItem(e2Trunk._id, 1, "kg")]};
export const dRoot = {...withItem(dTrunk._id, 1, "kg"), items: [withItem(daTrunk._id, 1, "kg"), withItem(dbTrunk._id, 1, "kg")]};
const daRoot = {...withItem(daTrunk._id, 1, "kg"), items: [withItem(e2Trunk._id, 1, "kg")]};
const dbRoot = {...withItem(dbTrunk._id, 1, "kg"), items: [withItem(dbaTrunk._id, 1, "kg")]};
const dbaRoot = {...withItem(dbaTrunk._id, 1, "kg"), items: [withItem(dbaaTrunk._id, 1, "kg")]};
const dbaaRoot = {...withItem(dbaaTrunk._id, 1, "kg"), items: [withItem(e2Trunk._id, 2, "kg")]};


const bBranch = {...withItem(bTrunk._id, 1, "kg"), items: [withItem(aTrunk._id, 1, "kg")]};
const baBranch = {...withItem(baTrunk._id, 1, "kg"), items: [withItem(bTrunk._id, 1, "kg")]};
const baaBranch = {...withItem(baaTrunk._id, 1, "kg"), items: [withItem(baTrunk._id, 1, "kg")]};
const babBranch = {...withItem(babTrunk._id, 1, "kg"), items: [withItem(baTrunk._id, 1, "kg")]};
const b2Branch = {...withItem(b2Trunk._id, 1, "kg"), items: [withItem(bTrunk._id, 1, "kg")]};
const cBranch = {...withItem(cTrunk._id, 1, "kg"), items: [withItem(aTrunk._id, 1, "kg")]};
const dBranch = {...withItem(dTrunk._id, 1, "kg"), items: [withItem(aTrunk._id, 1, "kg")]};
const daBranch = {...withItem(daTrunk._id, 1, "kg"), items: [withItem(dTrunk._id, 1, "kg")]};
const dbBranch = {...withItem(dbTrunk._id, 1, "kg"), items: [withItem(dTrunk._id, 1, "kg")]};
const dbaBranch = {...withItem(dbaTrunk._id, 1, "kg"), items: [withItem(dbTrunk._id, 1, "kg")]};
const dbaaBranch = {...withItem(dbaaTrunk._id, 1, "kg"), items: [withItem(dbaTrunk._id, 1, "kg")]};
const e1Branch = {...withItem(e1Trunk._id, 500, "L"), items: [withItem(baaTrunk._id, 50, "kg"), withItem(babTrunk._id, 1, "kg")]};
const e2Branch = {...withItem(e2Trunk._id, 1, "kg"), items: [withItem(b2Trunk._id, 1, "kg"), withItem(cTrunk._id, 1, "kg"), withItem(daTrunk._id, 1, "kg"), withItem(dbaaTrunk._id, 500, "g")]};


const aFacets = {...withItem(aTrunk._id, 1, "kg"), items: [withItem(prixFacetEntry._id, 100, "€"), withItem(vitCFacetEntry._id, 10, "mol"), withItem(vitBFacetEntry._id, 100, "mmol"), withItem(vitEFacetEntry._id, 120, "mmol")]};
const bFacets = {_id: bTrunk._id, items: [withItem(prixFacetEntry._id, 40, "€"), withItem(vitCFacetEntry._id, 6, "mol"), withItem(vitBFacetEntry._id, 60, "mmol"), withItem(vitEFacetEntry._id, 80, "mmol")]};

const aImpacts = {...withItem(aTrunk._id, 1, "kg"), items: [withItem(prixImpactEntry._id, 100, "€"), withItem(vitCImpactEntry._id, 10, "mol"), withItem(vitBImpactEntry._id, 100, "mmol"), withItem(co2eImpactEntry._id, 120, "mmol")]};
const bImpacts = {_id: bTrunk._id, items: [withItem(prixImpactEntry._id, 40, "€"), withItem(vitCImpactEntry._id, 6, "mol"), withItem(vitBImpactEntry._id, 60, "mmol"), withItem(vitDImpactEntry._id, 80, "mmol")]};

export const database = {
    [cols.TRUNK]: [aTrunk, bTrunk, cTrunk, dTrunk, baTrunk, b2Trunk, daTrunk, dbTrunk, baaTrunk, babTrunk, dbaTrunk, dbaaTrunk, e1Trunk, e2Trunk],
    [cols.ROOT]: [aRoot, bRoot, baRoot, baaRoot, babRoot, b2Root, cRoot, dRoot, daRoot, dbRoot, dbaRoot, dbaaRoot],
    [cols.FACET]: [aFacets, bFacets],
    [cols.IMPACT]: [aImpacts, bImpacts],
    [cols.BRANCH]: [bBranch, baBranch, baaBranch, babBranch, b2Branch, cBranch, dBranch, daBranch, dbBranch, dbaBranch, dbaaBranch, e1Branch, e2Branch]
};