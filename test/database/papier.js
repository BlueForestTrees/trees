import {cols} from "../../src/const/collections"
import {withIdBqt, withDbTrunk} from "test-api-express-mongo/dist/domain"
import {co2eImpactEntry} from "./impactEntries"

export const papierVA = withDbTrunk("papier version A", "111111111111111111111111", 100, "Surf")
export const papierVB = withDbTrunk("papier version B", "222222222222222222222222", 50, "Surf")
export const couchePE = withDbTrunk("couche Plastique Polyéthylène", "333333333333333333333333", 1, "Mass")
export const couchePapier = withDbTrunk("couche Papier", "444444444444444444444444", 10, "Mass")
export const coucheAdhesif = withDbTrunk("couche Adhésif", "555555555555555555555555", 100, "Mass")
export const coucheAlu = withDbTrunk("couche Alu", "666666666666666666666666", 1000, "Mass")

const papierVAItem = withIdBqt(papierVA._id, 100)
const papierVBItem = withIdBqt(papierVB._id, 100)
const couchePEItem = withIdBqt(couchePE._id, 7)
const couchePapierItem = withIdBqt(couchePapier._id, 10)
const coucheAdhesifItem = withIdBqt(coucheAdhesif._id, 100)
const coucheAluItem = withIdBqt(coucheAlu._id, 11)

const papierVARoot = {_id: papierVAItem._id, items: [couchePEItem, couchePapierItem, coucheAdhesifItem, coucheAluItem]}
const papierVBRoot = {_id: papierVBItem._id, items: [couchePEItem, couchePapierItem, coucheAdhesifItem]}

const couchePEBranch = {_id: couchePEItem._id, items: [papierVAItem, papierVBItem]}
const couchePapierBranch = {_id: couchePapierItem._id, items: [papierVAItem, papierVBItem]}
const coucheAdhesifBranch = {_id: coucheAdhesifItem._id, items: [papierVAItem, papierVBItem]}
const coucheAluBranch = {_id: coucheAluItem._id, items: [papierVAItem]}

const couchePEImpact = {_id: couchePE._id, items: [withIdBqt(co2eImpactEntry._id, 1)]}
const couchePapierImpact = {_id: couchePapier._id, items: [withIdBqt(co2eImpactEntry._id, 10)]}
const coucheAdhesifImpact = {_id: coucheAdhesif._id, items: [withIdBqt(co2eImpactEntry._id, 100)]}
const coucheAluImpact = {_id: coucheAlu._id, items: [withIdBqt(co2eImpactEntry._id, 1000)]}

export const database = {
    [cols.TRUNK]: [papierVA, papierVB, coucheAdhesif, coucheAlu, couchePapier, couchePE],
    [cols.ROOT]: [papierVARoot, papierVBRoot],
    [cols.IMPACT]: [couchePEImpact, couchePapierImpact, coucheAdhesifImpact, coucheAluImpact],
    [cols.BRANCH]: [couchePEBranch, coucheAdhesifBranch, coucheAluBranch, couchePapierBranch]
}
