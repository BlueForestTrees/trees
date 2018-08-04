import {withIdQuantity, withId, withTrunk} from "test-api-express-mongo/dist/domain"
import {cols} from "../../src/const/collections"

export const skateTrunk = withTrunk("skate", 10, "count")
export const plancheTrunk = withTrunk("planche",16,"count")
export const boisTrunk = withTrunk("bois", 5,"t")
export const arbreTrunk = withTrunk("arbre", 1,"count")
export const rouletteTrunk = withTrunk("roulette", 4,"count")
export const elecTrunk = withTrunk("elec", 1,"kWh")
export const eauTrunk = withTrunk("eau", 6,"L")
export const foretTrunk = withTrunk("foret", 1,"count")
export const bucheTrunk = withTrunk("buche", 10,"kg")
export const chauffageTrunk = withTrunk("chauffage", 1,"j")
export const grandeForetTrunk = withTrunk("Grande forêt", 1000,"m2")
export const refugeBioTrunk = withTrunk("Refuge de biodiversité", 4,"count")
export const planeteTrunk = withTrunk("Planète", 1,"count")
export const systemeTrunk = withTrunk("Système", 1,"count")

export const skateRoot = {...withIdQuantity(skateTrunk._id, 1, "count"), items: [withIdQuantity(plancheTrunk._id, 1, "count"), withIdQuantity(rouletteTrunk._id, 4, "count")]}
const plancheRoot = {...withIdQuantity(plancheTrunk._id, 1000, "count"), items: [withIdQuantity(eauTrunk._id, 1000, "L"), withIdQuantity(elecTrunk._id, 10000, "kWh"), withIdQuantity(boisTrunk._id, 500, "kg")]}
const boisRoot = {...withIdQuantity(boisTrunk._id, 1, "t"), items: [withIdQuantity(arbreTrunk._id, 1, "count")]}
const rouletteRoot = {...withIdQuantity(rouletteTrunk._id, 1000000, "count"), items: [withIdQuantity(eauTrunk._id, 1500, "L"), withIdQuantity(elecTrunk._id, 20000, "kWh")]}

const plancheBranch = {...withIdQuantity(plancheTrunk._id, 1, "count"), items: [withIdQuantity(skateTrunk._id, 1, "count")]}
const rouletteBranch = {...withIdQuantity(rouletteTrunk._id, 1, "count"), items: [withIdQuantity(skateTrunk._id, 0.25, "count")]}
const eauBranch = {...withIdQuantity(eauTrunk._id, 1500, "L"), items: [withIdQuantity(plancheTrunk._id, 1500, "count"), withIdQuantity(rouletteTrunk._id, 1000000, "count")]}
const elecBranch = {...withIdQuantity(elecTrunk._id, 10, "kWh"), items: [withIdQuantity(plancheTrunk._id, 1, "count"), withIdQuantity(rouletteTrunk._id, 50, "count")]}
export const boisBranch = {...withIdQuantity(boisTrunk._id, 500, "kg"), items: [withIdQuantity(plancheTrunk._id, 1000, "count"), withIdQuantity(bucheTrunk._id, 500, "kg")]}
const arbreBranch = {...withIdQuantity(arbreTrunk._id, 1, "count"), items: [withIdQuantity(boisTrunk._id, 1, "t"), withIdQuantity(foretTrunk._id, 0.001, "count")]}
const bucheBranch = {...withIdQuantity(bucheTrunk._id, 3, "kg"), items: [withIdQuantity(chauffageTrunk._id, 1, "h")]}
const foretBranch = {...withIdQuantity(foretTrunk._id, 3, "count"), items: [withId(grandeForetTrunk._id)]}
const grandeForetBranch = {...withIdQuantity(grandeForetTrunk._id, 10, "count"), items: [withIdQuantity(refugeBioTrunk._id, 1, "count")]}

export const database = {
    [cols.TRUNK]: [skateTrunk, plancheTrunk, boisTrunk, arbreTrunk, rouletteTrunk, elecTrunk, eauTrunk, foretTrunk, bucheTrunk, chauffageTrunk, grandeForetTrunk, refugeBioTrunk, planeteTrunk, systemeTrunk],
    [cols.ROOT]: [skateRoot, plancheRoot, boisRoot, rouletteRoot],
    [cols.BRANCH]: [plancheBranch, rouletteBranch, eauBranch, elecBranch, boisBranch, arbreBranch, bucheBranch, foretBranch, grandeForetBranch]
}
