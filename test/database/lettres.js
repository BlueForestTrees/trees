import {withIdBqt, withDbTrunk} from "test-api-express-mongo"
import {cols} from "../../src/const/collections"
import {createStringObjectId, object} from "test-api-express-mongo"
import {prixFacetEntry, vitBFacetEntry, vitCFacetEntry, vitEFacetEntry} from "./facetEntries"
import {co2eImpactEntry, prixImpactEntry, vitBImpactEntry, vitCImpactEntry, vitDImpactEntry} from "./impactEntries"

export const aTrunk = withDbTrunk("a", "aaaaaaaaaaaaaaaaaaaaaaaa", 10, "Mass")
export const bTrunk = withDbTrunk("b", "bbbbbbbbbbbbbbbbbbbbbbbb", 10, "Mass")
export const cTrunk = withDbTrunk("c", "cccccccccccccccccccccccc", 10, "Mass")
export const dTrunk = withDbTrunk("d", "dddddddddddddddddddddddd", 10, "Mass")
export const baTrunk = withDbTrunk("ba", "babababababababababababa", 10, "Mass")
export const b2Trunk = withDbTrunk("b2", "b2b2b2b2b2b2b2b2b2b2b2b2", 10, "Mass")
export const daTrunk = withDbTrunk("da", "dadadadadadadadadadadada", 10, "Mass")
export const dbTrunk = withDbTrunk("db", "dbdbdbdbdbdbdbdbdbdbdbdb", 10, "Mass")
export const baaTrunk = withDbTrunk("baa", "baabaabaabaabaabaabaabaa", 10, "Mass")
export const babTrunk = withDbTrunk("bab", "babbabbabbabbabbabbabbab", 10, "Mass")
export const dbaTrunk = withDbTrunk("dba", "dbadbadbadbadbadbadbadba", 10, "Mass")
export const dbaaTrunk = withDbTrunk("dbaa", "dbaadbaadbaadbaadbaadbaa", 10, "Mass")
export const e1Trunk = withDbTrunk("e1", "e1e1e1e1e1e1e1e1e1e1e1e1", 1, "Volu")
export const e2Trunk = withDbTrunk("e2", "e2e2e2e2e2e2e2e2e2e2e2e2", 10, "Mass")

const aRoots = [
    {_id: object("fafa0001aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, rootId: bTrunk._id, bqt: 10},
    {_id: object("fafa0002aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, rootId: cTrunk._id, bqt: 10},
    {_id: object("fafa0003aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, rootId: dTrunk._id, bqt: 10}
]
const bRoots = [
    {_id: object("fafa0004aaaaaaaaaaaaaaaa"), trunkId: bTrunk._id, rootId: baTrunk._id, bqt: 10},
    {_id: object("fafa0005aaaaaaaaaaaaaaaa"), trunkId: bTrunk._id, rootId: b2Trunk._id, bqt: 10},
]
const baRoots = [
    {_id: object("fafa0006aaaaaaaaaaaaaaaa"), trunkId: baTrunk._id, rootId: baaTrunk._id, bqt: 10},
    {_id: object("fafa0007aaaaaaaaaaaaaaaa"), trunkId: baTrunk._id, rootId: babTrunk._id, bqt: 10},
]
const baaRoots = [
    {_id: object("fafa0008aaaaaaaaaaaaaaaa"), trunkId: baaTrunk._id, rootId: e1Trunk._id, bqt: 0.01},
]

const babRoots = [
    {_id: object("fafa0009aaaaaaaaaaaaaaaa"), trunkId: babTrunk._id, rootId: e1Trunk._id, bqt: 0.5},
]
const b2Roots = [
    {_id: object("fafa0010aaaaaaaaaaaaaaaa"), trunkId: b2Trunk._id, rootId: e2Trunk._id, bqt: 10},
]
const cRoots = [
    {_id: object("fafa0011aaaaaaaaaaaaaaaa"), trunkId: cTrunk._id, rootId: e2Trunk._id, bqt: 10},
]
export const dRoots = [
    {_id: object("fafa0012aaaaaaaaaaaaaaaa"), trunkId: dTrunk._id, rootId: daTrunk._id, bqt: 10},
    {_id: object("fafa0013aaaaaaaaaaaaaaaa"), trunkId: dTrunk._id, rootId: dbTrunk._id, bqt: 10},
]
export const daRoots = [
    {_id: object("fafa0014aaaaaaaaaaaaaaaa"), trunkId: daTrunk._id, rootId: e2Trunk._id, bqt: 10},
]
export const dbRoots = [
    {_id: object("fafa0015aaaaaaaaaaaaaaaa"), trunkId: dbTrunk._id, rootId: dbaTrunk._id, bqt: 10},
]
export const dbaRoots = [
    {_id: object("fafa0016aaaaaaaaaaaaaaaa"), trunkId: dbaTrunk._id, rootId: dbaaTrunk._id, bqt: 10},
]
export const dbaaRoots = [
    {_id: object("fafa0017aaaaaaaaaaaaaaaa"), trunkId: dbaaTrunk._id, rootId: e2Trunk._id, bqt: 2000},
]

const bBranch = {_id: bTrunk._id, items: [withIdBqt(aTrunk._id, 10)]}
const baBranch = {_id: baTrunk._id, items: [withIdBqt(bTrunk._id, 10)]}
const baaBranch = {_id: baaTrunk._id, items: [withIdBqt(baTrunk._id, 10)]}
const babBranch = {_id: babTrunk._id, items: [withIdBqt(baTrunk._id, 10)]}
const b2Branch = {_id: b2Trunk._id, items: [withIdBqt(bTrunk._id, 10)]}
const cBranch = {_id: cTrunk._id, items: [withIdBqt(aTrunk._id, 10)]}
const dBranch = {_id: dTrunk._id, items: [withIdBqt(aTrunk._id, 10)]}
const daBranch = {_id: daTrunk._id, items: [withIdBqt(dTrunk._id, 10)]}
const dbBranch = {_id: dbTrunk._id, items: [withIdBqt(dTrunk._id, 10)]}
const dbaBranch = {_id: dbaTrunk._id, items: [withIdBqt(dbTrunk._id, 10)]}
const dbaaBranch = {_id: dbaaTrunk._id, items: [withIdBqt(dbaTrunk._id, 10)]}
const e1Branch = {_id: e1Trunk._id, items: [withIdBqt(baaTrunk._id, 50000), withIdBqt(babTrunk._id, 10)]}
const e2Branch = {_id: e2Trunk._id, items: [withIdBqt(b2Trunk._id, 10), withIdBqt(cTrunk._id, 10), withIdBqt(daTrunk._id, 10), withIdBqt(dbaaTrunk._id, 500)]}

const aFacets = [
    {_id: object("fafa0018aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, facetId: prixFacetEntry._id, bqt: 100},
    {_id: object("fafa0019aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, facetId: vitCFacetEntry._id, bqt: 10},
    {_id: object("fafa0020aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, facetId: vitBFacetEntry._id, bqt: 0.1},
    {_id: object("fafa0021aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, facetId: vitEFacetEntry._id, bqt: 0.12}
]

const bFacets = [
    {_id: object("fafa0022aaaaaaaaaaaaaaaa"), trunkId: bTrunk._id, facetId: prixFacetEntry._id, bqt: 40},
    {_id: object("fafa0023aaaaaaaaaaaaaaaa"), trunkId: bTrunk._id, facetId: vitCFacetEntry._id, bqt: 6},
    {_id: object("fafa0024aaaaaaaaaaaaaaaa"), trunkId: bTrunk._id, facetId: vitBFacetEntry._id, bqt: 0.06},
    {_id: object("fafa0025aaaaaaaaaaaaaaaa"), trunkId: bTrunk._id, facetId: vitEFacetEntry._id, bqt: 0.08}
]

const aImpacts = [
    {_id: object("fafa0026aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, facetId: prixFacetEntry._id, bqt: 100},
    {_id: object("fafa0027aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, facetId: vitCImpactEntry._id, bqt: 100},
    {_id: object("fafa0028aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, facetId: vitBImpactEntry._id, bqt: 100},
    {_id: object("fafa0029aaaaaaaaaaaaaaaa"), trunkId: aTrunk._id, facetId: co2eImpactEntry._id, bqt: 100},
]
const bImpacts = [
    {_id: object("fafa0030aaaaaaaaaaaaaaaa"), trunkId: bTrunk._id, impactId: prixFacetEntry._id, bqt: 40},
    {_id: object("fafa0031aaaaaaaaaaaaaaaa"), trunkId: bTrunk._id, impactId: vitCImpactEntry._id, bqt: 6},
    {_id: object("fafa0032aaaaaaaaaaaaaaaa"), trunkId: bTrunk._id, impactId: vitBImpactEntry._id, bqt: 0.06},
    {_id: object("fafa0033aaaaaaaaaaaaaaaa"), trunkId: bTrunk._id, impactId: co2eImpactEntry._id, bqt: 0.08},
]

export const database = {
    [cols.TRUNK]: [aTrunk, bTrunk, cTrunk, dTrunk, baTrunk, b2Trunk, daTrunk, dbTrunk, baaTrunk, babTrunk, dbaTrunk, dbaaTrunk, e1Trunk, e2Trunk],
    [cols.ROOT]: [...aRoots, ...bRoots, ...baRoots, ...baaRoots, ...babRoots, ...b2Roots, ...cRoots, ...dRoots, ...daRoots, ...dbRoots, ...dbaRoots, ...dbaaRoots],
    [cols.FACET]: [...aFacets, ...bFacets],
    [cols.IMPACT]: [...aImpacts, ...bImpacts],
    [cols.BRANCH]: [bBranch, baBranch, baaBranch, babBranch, b2Branch, cBranch, dBranch, daBranch, dbBranch, dbaBranch, dbaaBranch, e1Branch, e2Branch]
}