import {withIdBqt, withDbTrunk} from "test-api-express-mongo/dist/domain"
import {cols} from "../../src/const/collections"
import {prixFacetEntry, vitBFacetEntry, vitCFacetEntry, vitEFacetEntry} from "./facetEntries"
import {co2eImpactEntry, prixImpactEntry, vitBImpactEntry, vitCImpactEntry, vitDImpactEntry} from "./impactEntries"

export const aTrunk = withDbTrunk("a", "aaaaaaaaaaaaaaaaaaaaaaaa", 1000, "Mass")
export const bTrunk = withDbTrunk("b", "bbbbbbbbbbbbbbbbbbbbbbbb", 1000, "Mass")
export const cTrunk = withDbTrunk("c", "cccccccccccccccccccccccc", 1000, "Mass")
export const dTrunk = withDbTrunk("d", "dddddddddddddddddddddddd", 1000, "Mass")
export const baTrunk = withDbTrunk("ba", "babababababababababababa", 1000, "Mass")
export const b2Trunk = withDbTrunk("b2", "b2b2b2b2b2b2b2b2b2b2b2b2", 1000, "Mass")
export const daTrunk = withDbTrunk("da", "dadadadadadadadadadadada", 1000, "Mass")
export const dbTrunk = withDbTrunk("db", "dbdbdbdbdbdbdbdbdbdbdbdb", 1000, "Mass")
export const baaTrunk = withDbTrunk("baa", "baabaabaabaabaabaabaabaa", 1000, "Mass")
export const babTrunk = withDbTrunk("bab", "babbabbabbabbabbabbabbab", 1000, "Mass")
export const dbaTrunk = withDbTrunk("dba", "dbadbadbadbadbadbadbadba", 1000, "Mass")
export const dbaaTrunk = withDbTrunk("dbaa", "dbaadbaadbaadbaadbaadbaa", 1000, "Mass")
export const e1Trunk = withDbTrunk("e1", "e1e1e1e1e1e1e1e1e1e1e1e1", 1, "Volu")
export const e2Trunk = withDbTrunk("e2", "e2e2e2e2e2e2e2e2e2e2e2e2", 1000, "Mass")

const aRoot = {_id: aTrunk._id, items: [withIdBqt(bTrunk._id, 1000), withIdBqt(cTrunk._id, 1000), withIdBqt(dTrunk._id, 1000)]}
const bRoot = {_id: bTrunk._id, items: [withIdBqt(baTrunk._id, 1000), withIdBqt(b2Trunk._id, 1000)]}
const baRoot = {_id: baTrunk._id, items: [withIdBqt(baaTrunk._id, 1000), withIdBqt(babTrunk._id, 1000)]}
const baaRoot = {_id: baaTrunk._id, items: [withIdBqt(e1Trunk._id, 0.01)]}
const babRoot = {_id: babTrunk._id, items: [withIdBqt(e1Trunk._id, 0.5)]}
const b2Root = {_id: b2Trunk._id, items: [withIdBqt(e2Trunk._id, 1000)]}
const cRoot = {_id: cTrunk._id, items: [withIdBqt(e2Trunk._id, 1000)]}
export const dRoot = {_id: dTrunk._id, items: [withIdBqt(daTrunk._id, 1000), withIdBqt(dbTrunk._id, 1000)]}
const daRoot = {_id: daTrunk._id, items: [withIdBqt(e2Trunk._id, 1000)]}
const dbRoot = {_id: dbTrunk._id, items: [withIdBqt(dbaTrunk._id, 1000)]}
const dbaRoot = {_id: dbaTrunk._id, items: [withIdBqt(dbaaTrunk._id, 1000)]}
const dbaaRoot = {_id: dbaaTrunk._id, items: [withIdBqt(e2Trunk._id, 2000)]}


const bBranch = {_id: bTrunk._id, items: [withIdBqt(aTrunk._id, 1000)]}
const baBranch = {_id: baTrunk._id, items: [withIdBqt(bTrunk._id, 1000)]}
const baaBranch = {_id: baaTrunk._id, items: [withIdBqt(baTrunk._id, 1000)]}
const babBranch = {_id: babTrunk._id, items: [withIdBqt(baTrunk._id, 1000)]}
const b2Branch = {_id: b2Trunk._id, items: [withIdBqt(bTrunk._id, 1000)]}
const cBranch = {_id: cTrunk._id, items: [withIdBqt(aTrunk._id, 1000)]}
const dBranch = {_id: dTrunk._id, items: [withIdBqt(aTrunk._id, 1000)]}
const daBranch = {_id: daTrunk._id, items: [withIdBqt(dTrunk._id, 1000)]}
const dbBranch = {_id: dbTrunk._id, items: [withIdBqt(dTrunk._id, 1000)]}
const dbaBranch = {_id: dbaTrunk._id, items: [withIdBqt(dbTrunk._id, 1000)]}
const dbaaBranch = {_id: dbaaTrunk._id, items: [withIdBqt(dbaTrunk._id, 1000)]}
const e1Branch = {_id: e1Trunk._id, items: [withIdBqt(baaTrunk._id, 50000), withIdBqt(babTrunk._id, 1000)]}
const e2Branch = {_id: e2Trunk._id, items: [withIdBqt(b2Trunk._id, 1000), withIdBqt(cTrunk._id, 1000), withIdBqt(daTrunk._id, 1000), withIdBqt(dbaaTrunk._id, 500)]}


const aFacets = {_id: aTrunk._id, items: [withIdBqt(prixFacetEntry._id, 100), withIdBqt(vitCFacetEntry._id, 10), withIdBqt(vitBFacetEntry._id, 0.1), withIdBqt(vitEFacetEntry._id, 0.12)]}
const bFacets = {_id: bTrunk._id, items: [withIdBqt(prixFacetEntry._id, 40), withIdBqt(vitCFacetEntry._id, 6), withIdBqt(vitBFacetEntry._id, 0.06), withIdBqt(vitEFacetEntry._id, 0.08)]}

const aImpacts = {_id: aTrunk._id, items: [withIdBqt(prixImpactEntry._id, 100), withIdBqt(vitCImpactEntry._id, 10), withIdBqt(vitBImpactEntry._id, 0.1), withIdBqt(co2eImpactEntry._id, 0.12)]}
const bImpacts = {_id: bTrunk._id, items: [withIdBqt(prixImpactEntry._id, 40), withIdBqt(vitCImpactEntry._id, 6), withIdBqt(vitBImpactEntry._id, 0.06), withIdBqt(vitDImpactEntry._id, 0.08)]}

export const database = {
    [cols.TRUNK]: [aTrunk, bTrunk, cTrunk, dTrunk, baTrunk, b2Trunk, daTrunk, dbTrunk, baaTrunk, babTrunk, dbaTrunk, dbaaTrunk, e1Trunk, e2Trunk],
    [cols.ROOT]: [aRoot, bRoot, baRoot, baaRoot, babRoot, b2Root, cRoot, dRoot, daRoot, dbRoot, dbaRoot, dbaaRoot],
    [cols.FACET]: [aFacets, bFacets],
    [cols.IMPACT]: [aImpacts, bImpacts],
    [cols.BRANCH]: [bBranch, baBranch, baaBranch, babBranch, b2Branch, cBranch, dBranch, daBranch, dbBranch, dbaBranch, dbaaBranch, e1Branch, e2Branch]
}