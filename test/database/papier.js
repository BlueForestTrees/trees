import {object} from "test-api-express-mongo/dist/util"
import {cols} from "../../src/const/collections"
import {withIdBqt, withDbTrunk} from "test-api-express-mongo/dist/domain"
import {co2eImpactEntry} from "./impactEntries"

export const papierVA = withDbTrunk("papier version A", "111111111111111111111111", 100, "Surf")
export const papierVB = withDbTrunk("papier version B", "222222222222222222222222", 50, "Surf")
export const couchePE = withDbTrunk("couche Plastique Polyéthylène", "333333333333333333333333", 1, "Mass")
export const couchePapier = withDbTrunk("couche Papier", "444444444444444444444444", 10, "Mass")
export const coucheAdhesif = withDbTrunk("couche Adhésif", "555555555555555555555555", 100, "Mass")
export const coucheAlu = withDbTrunk("couche Alu", "666666666666666666666666", 1000, "Mass")

const roots = []
const branches = []

const link = (_id, trunkId, rootId, bqt) => {
    roots.push({_id, trunkId, rootId, bqt})
    branches.push({_id, trunkId: rootId, branchId: trunkId, bqt: 1 / bqt})
}

link(object("a11111111111111111111111"), papierVA._id, couchePE._id, 7)
link(object("a11111111111111111111112"), papierVA._id, couchePapier._id, 10)
link(object("a11111111111111111111113"), papierVA._id, coucheAdhesif._id, 100)
link(object("a11111111111111111111114"), papierVA._id, coucheAlu._id, 11)

link(object("a11111111111111111111115"), papierVB._id, couchePE._id, 7)
link(object("a11111111111111111111116"), papierVB._id, couchePapier._id, 10)
link(object("a11111111111111111111117"), papierVB._id, coucheAdhesif._id, 100)

const couchePEImpacts = [{_id: object("a11111111111111111111118"), trunkId: couchePE._id, impactId: co2eImpactEntry._id, bqt: 1}]
const couchePapierImpacts = [{_id: object("a11111111111111111111119"), trunkId: couchePapier._id, impactId: co2eImpactEntry._id, bqt: 10}]
const coucheAdhesifImpacts = [{_id: object("a11111111111111111111120"), trunkId: coucheAdhesif._id, impactId: co2eImpactEntry._id, bqt: 100}]
const coucheAluImpacts = [{_id: object("a11111111111111111111121"), trunkId: coucheAlu._id, impactId: co2eImpactEntry._id, bqt: 1000}]

export const database = {
    [cols.TRUNK]: [papierVA, papierVB, coucheAdhesif, coucheAlu, couchePapier, couchePE],
    [cols.ROOT]: roots,
    [cols.IMPACT]: [...couchePEImpacts, ...couchePapierImpacts, ...coucheAdhesifImpacts, ...coucheAluImpacts],
    [cols.BRANCH]: branches
}

