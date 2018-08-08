import {withIdBqtG, withDbTrunk} from "test-api-express-mongo/dist/domain"
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

const aRoot = {...withIdBqtG(aTrunk._id, 1000, "Mass"), items: [withIdBqtG(bTrunk._id, 1000, "Mass"), withIdBqtG(cTrunk._id, 1000, "Mass"), withIdBqtG(dTrunk._id, 1000, "Mass")]}
const bRoot = {...withIdBqtG(bTrunk._id, 1000, "Mass"), items: [withIdBqtG(baTrunk._id, 1000, "Mass"), withIdBqtG(b2Trunk._id, 1000, "Mass")]}
const baRoot = {...withIdBqtG(baTrunk._id, 1000, "Mass"), items: [withIdBqtG(baaTrunk._id, 1000, "Mass"), withIdBqtG(babTrunk._id, 1000, "Mass")]}
const baaRoot = {...withIdBqtG(baaTrunk._id, 1000, "Mass"), items: [withIdBqtG(e1Trunk._id, 0.01, "Volu")]}
const babRoot = {...withIdBqtG(babTrunk._id, 1000, "Mass"), items: [withIdBqtG(e1Trunk._id, 0.5, "Volu")]}
const b2Root = {...withIdBqtG(b2Trunk._id, 1000, "Mass"), items: [withIdBqtG(e2Trunk._id, 1000, "Mass")]}
const cRoot = {...withIdBqtG(cTrunk._id, 1000, "Mass"), items: [withIdBqtG(e2Trunk._id, 1000, "Mass")]}
export const dRoot = {...withIdBqtG(dTrunk._id, 1000, "Mass"), items: [withIdBqtG(daTrunk._id, 1000, "Mass"), withIdBqtG(dbTrunk._id, 1000, "Mass")]}
const daRoot = {...withIdBqtG(daTrunk._id, 1000, "Mass"), items: [withIdBqtG(e2Trunk._id, 1000, "Mass")]}
const dbRoot = {...withIdBqtG(dbTrunk._id, 1000, "Mass"), items: [withIdBqtG(dbaTrunk._id, 1000, "Mass")]}
const dbaRoot = {...withIdBqtG(dbaTrunk._id, 1000, "Mass"), items: [withIdBqtG(dbaaTrunk._id, 1000, "Mass")]}
const dbaaRoot = {...withIdBqtG(dbaaTrunk._id, 1000, "Mass"), items: [withIdBqtG(e2Trunk._id, 2000, "Mass")]}


const bBranch = {...withIdBqtG(bTrunk._id, 1000, "Mass"), items: [withIdBqtG(aTrunk._id, 1000, "Mass")]}
const baBranch = {...withIdBqtG(baTrunk._id, 1000, "Mass"), items: [withIdBqtG(bTrunk._id, 1000, "Mass")]}
const baaBranch = {...withIdBqtG(baaTrunk._id, 1000, "Mass"), items: [withIdBqtG(baTrunk._id, 1000, "Mass")]}
const babBranch = {...withIdBqtG(babTrunk._id, 1000, "Mass"), items: [withIdBqtG(baTrunk._id, 1000, "Mass")]}
const b2Branch = {...withIdBqtG(b2Trunk._id, 1000, "Mass"), items: [withIdBqtG(bTrunk._id, 1000, "Mass")]}
const cBranch = {...withIdBqtG(cTrunk._id, 1000, "Mass"), items: [withIdBqtG(aTrunk._id, 1000, "Mass")]}
const dBranch = {...withIdBqtG(dTrunk._id, 1000, "Mass"), items: [withIdBqtG(aTrunk._id, 1000, "Mass")]}
const daBranch = {...withIdBqtG(daTrunk._id, 1000, "Mass"), items: [withIdBqtG(dTrunk._id, 1000, "Mass")]}
const dbBranch = {...withIdBqtG(dbTrunk._id, 1000, "Mass"), items: [withIdBqtG(dTrunk._id, 1000, "Mass")]}
const dbaBranch = {...withIdBqtG(dbaTrunk._id, 1000, "Mass"), items: [withIdBqtG(dbTrunk._id, 1000, "Mass")]}
const dbaaBranch = {...withIdBqtG(dbaaTrunk._id, 1000, "Mass"), items: [withIdBqtG(dbaTrunk._id, 1000, "Mass")]}
const e1Branch = {...withIdBqtG(e1Trunk._id, 0.5, "Volu"), items: [withIdBqtG(baaTrunk._id, 50000, "Mass"), withIdBqtG(babTrunk._id, 1000, "Mass")]}
const e2Branch = {...withIdBqtG(e2Trunk._id, 1000, "Mass"), items: [withIdBqtG(b2Trunk._id, 1000, "Mass"), withIdBqtG(cTrunk._id, 1000, "Mass"), withIdBqtG(daTrunk._id, 1000, "Mass"), withIdBqtG(dbaaTrunk._id, 500, "Mass")]}


const aFacets = {...withIdBqtG(aTrunk._id, 1000, "Mass"), items: [withIdBqtG(prixFacetEntry._id, 100, "Prix"), withIdBqtG(vitCFacetEntry._id, 10, "Dens"), withIdBqtG(vitBFacetEntry._id, 0.1, "Dens"), withIdBqtG(vitEFacetEntry._id, 0.12, "Dens")]}
const bFacets = {_id: bTrunk._id, items: [withIdBqtG(prixFacetEntry._id, 40, "Prix"), withIdBqtG(vitCFacetEntry._id, 6, "Dens"), withIdBqtG(vitBFacetEntry._id, 0.06, "Dens"), withIdBqtG(vitEFacetEntry._id, 0.08, "Dens")]}

const aImpacts = {...withIdBqtG(aTrunk._id, 1000, "Mass"), items: [withIdBqtG(prixImpactEntry._id, 100, "Prix"), withIdBqtG(vitCImpactEntry._id, 10, "Dens"), withIdBqtG(vitBImpactEntry._id, 0.1, "Dens"), withIdBqtG(co2eImpactEntry._id, 0.12, "Dens")]}
const bImpacts = {_id: bTrunk._id, items: [withIdBqtG(prixImpactEntry._id, 40, "Prix"), withIdBqtG(vitCImpactEntry._id, 6, "Dens"), withIdBqtG(vitBImpactEntry._id, 0.06, "Dens"), withIdBqtG(vitDImpactEntry._id, 0.08, "Dens")]}

export const database = {
    [cols.TRUNK]: [aTrunk, bTrunk, cTrunk, dTrunk, baTrunk, b2Trunk, daTrunk, dbTrunk, baaTrunk, babTrunk, dbaTrunk, dbaaTrunk, e1Trunk, e2Trunk],
    [cols.ROOT]: [aRoot, bRoot, baRoot, baaRoot, babRoot, b2Root, cRoot, dRoot, daRoot, dbRoot, dbaRoot, dbaaRoot],
    [cols.FACET]: [aFacets, bFacets],
    [cols.IMPACT]: [aImpacts, bImpacts],
    [cols.BRANCH]: [bBranch, baBranch, baaBranch, babBranch, b2Branch, cBranch, dBranch, daBranch, dbBranch, dbaBranch, dbaaBranch, e1Branch, e2Branch]
}