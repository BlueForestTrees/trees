import {cols} from "../../src/const/collections"
import {withIdQuantity, withTrunk} from "test-api-express-mongo/dist/domain"
import {co2eImpactEntry} from "./impactEntries"

export const papierVA = withTrunk("papier version A", 100, "m2")
const papierVB = withTrunk("papier version B", 50, "m2")
export const couchePE = withTrunk("couche Plastique Polyéthylène", 1, "t")
export const couchePapier = withTrunk("couche Papier", 1, "t")
export const coucheAdhesif = withTrunk("couche Adhésif", 1, "t")
export const coucheAlu = withTrunk("couche Alu", 1, "t")

const papierVAItem = withIdQuantity(papierVA._id, 100, "m2")
const papierVBItem = withIdQuantity(papierVB._id, 100, "m2")
const couchePEItem = withIdQuantity(couchePE._id, 780, "kg")
const couchePapierItem = withIdQuantity(couchePapier._id, 2070, "kg")
const coucheAdhesifItem = withIdQuantity(coucheAdhesif._id, 80, "kg")
const coucheAluItem = withIdQuantity(coucheAlu._id, 890, "kg")

const papierVARoot = {...papierVAItem, items: [couchePEItem, couchePapierItem, coucheAdhesifItem, coucheAluItem]}
const papierVBRoot = {...papierVBItem, items: [couchePEItem, couchePapierItem, coucheAdhesifItem]}

const couchePEBranch = {...couchePEItem, items: [papierVAItem, papierVBItem]}
const couchePapierBranch = {...couchePapierItem, items: [papierVAItem, papierVBItem]}
const coucheAdhesifBranch = {...coucheAdhesifItem, items: [papierVAItem, papierVBItem]}
const coucheAluBranch = {...coucheAluItem, items: [papierVAItem]}

const couchePEImpact = {...withIdQuantity(couchePE._id, 1, "t"), items: [withIdQuantity(co2eImpactEntry._id, 1920.512820513, "kg")]}
const couchePapierImpact = {...withIdQuantity(couchePapier._id, 1, "t"), items: [withIdQuantity(co2eImpactEntry._id, 410.144927536, "kg")]}
const coucheAdhesifImpact = {...withIdQuantity(coucheAdhesif._id, 1, "kg"), items: [withIdQuantity(co2eImpactEntry._id, 7.45, "kg")]}
const coucheAluImpact = {...withIdQuantity(coucheAlu._id, 1, "t"), items: [withIdQuantity(co2eImpactEntry._id, 9834.831460674, "kg")]}

export const database = {
    [cols.TRUNK]: [papierVA, papierVB, coucheAdhesif, coucheAlu, couchePapier, couchePE],
    [cols.ROOT]: [papierVARoot, papierVBRoot],
    [cols.IMPACT]: [couchePEImpact, couchePapierImpact, coucheAdhesifImpact, coucheAluImpact],
    [cols.BRANCH]: [couchePEBranch, coucheAdhesifBranch, coucheAluBranch, couchePapierBranch]
}
