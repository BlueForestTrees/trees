import {cols} from "../../src/const/collections"
import {withIdBqtG, withDbTrunk} from "test-api-express-mongo/dist/domain"
import {co2eImpactEntry} from "./impactEntries"

export const papierVA = withDbTrunk("papier version A", "111111111111111111111111", 100, "Surf")
export const papierVB = withDbTrunk("papier version B", "222222222222222222222222", 50, "Surf")
export const couchePE = withDbTrunk("couche Plastique Polyéthylène", "333333333333333333333333", 1, "t")
export const couchePapier = withDbTrunk("couche Papier", "444444444444444444444444", 1, "t")
export const coucheAdhesif = withDbTrunk("couche Adhésif", "555555555555555555555555", 1, "t")
export const coucheAlu = withDbTrunk("couche Alu", "666666666666666666666666", 1, "t")

const papierVAItem = withIdBqtG(papierVA._id, 100, "Surf")
const papierVBItem = withIdBqtG(papierVB._id, 100, "Surf")
const couchePEItem = withIdBqtG(couchePE._id, 780000, "Mass")
const couchePapierItem = withIdBqtG(couchePapier._id, 2070000, "Mass")
const coucheAdhesifItem = withIdBqtG(coucheAdhesif._id, 80000, "Mass")
const coucheAluItem = withIdBqtG(coucheAlu._id, 890000, "Mass")

const papierVARoot = {...papierVAItem, items: [couchePEItem, couchePapierItem, coucheAdhesifItem, coucheAluItem]}
const papierVBRoot = {...papierVBItem, items: [couchePEItem, couchePapierItem, coucheAdhesifItem]}

const couchePEBranch = {...couchePEItem, items: [papierVAItem, papierVBItem]}
const couchePapierBranch = {...couchePapierItem, items: [papierVAItem, papierVBItem]}
const coucheAdhesifBranch = {...coucheAdhesifItem, items: [papierVAItem, papierVBItem]}
const coucheAluBranch = {...coucheAluItem, items: [papierVAItem]}

const couchePEImpact = {...withIdBqtG(couchePE._id, 1000000, "Mass"), items: [withIdBqtG(co2eImpactEntry._id, 1920512.820513, "Mass")]}
const couchePapierImpact = {...withIdBqtG(couchePapier._id, 1000000, "Mass"), items: [withIdBqtG(co2eImpactEntry._id, 410144.927536, "Mass")]}
const coucheAdhesifImpact = {...withIdBqtG(coucheAdhesif._id, 1000, "Mass"), items: [withIdBqtG(co2eImpactEntry._id, 7450, "Mass")]}
const coucheAluImpact = {...withIdBqtG(coucheAlu._id, 1000000, "Mass"), items: [withIdBqtG(co2eImpactEntry._id, 9834831.460674, "Mass")]}

export const database = {
    [cols.TRUNK]: [papierVA, papierVB, coucheAdhesif, coucheAlu, couchePapier, couchePE],
    [cols.ROOT]: [papierVARoot, papierVBRoot],
    [cols.IMPACT]: [couchePEImpact, couchePapierImpact, coucheAdhesifImpact, coucheAluImpact],
    [cols.BRANCH]: [couchePEBranch, coucheAdhesifBranch, coucheAluBranch, couchePapierBranch]
}
