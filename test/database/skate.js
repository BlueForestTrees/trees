import {withIdBqtG, withId, withDbTrunk} from "test-api-express-mongo/dist/domain"
import {cols} from "../../src/const/collections"

export const skateTrunk = withDbTrunk("skate", "999903c03e77667641d99990", 10, "Nomb")
export const plancheTrunk = withDbTrunk("planche", "999903c03e77667641d99991", 16, "Nomb")
export const boisTrunk = withDbTrunk("bois", "999903c03e77667641d99995", 5, "t")
export const arbreTrunk = withDbTrunk("arbre", "999903c03e77667641d99996", 1, "Nomb")
export const rouletteTrunk = withDbTrunk("roulette", "999903c03e77667641d99992", 4, "Nomb")
export const elecTrunk = withDbTrunk("elec", "999903c03e77667641d99993", 861244.02, "Ener")
export const eauTrunk = withDbTrunk("eau", "999903c03e77667641d99994", 6, "L")
export const foretTrunk = withDbTrunk("foret", "999903c03e77667641d99997", 1, "Nomb")
export const bucheTrunk = withDbTrunk("buche", "999903c03e77667641d99998", 10000, "Mass")
export const chauffageTrunk = withDbTrunk("chauffage", "999903c03e77667641d99999", 1, "j")
export const grandeForetTrunk = withDbTrunk("Grande forêt", "999903c03e77667641d99910", 1000, "Surf")
export const refugeBioTrunk = withDbTrunk("Refuge de biodiversité", "999903c03e77667641d99911", 4, "Nomb")
export const planeteTrunk = withDbTrunk("Planète", "999903c03e77667641d99912", 1, "Nomb")
export const systemeTrunk = withDbTrunk("Système", "999903c03e77667641d99913", 1, "Nomb")

export const skateRoot = {...withIdBqtG(skateTrunk._id, 1, "Nomb"), items: [withIdBqtG(plancheTrunk._id, 1, "Nomb"), withIdBqtG(rouletteTrunk._id, 4, "Nomb")]}
const plancheRoot = {...withIdBqtG(plancheTrunk._id, 1000, "Nomb"), items: [withIdBqtG(eauTrunk._id, 1, "Volu"), withIdBqtG(elecTrunk._id, 10000*861244.02, "Ener"), withIdBqtG(boisTrunk._id, 500000, "Mass")]}
const boisRoot = {...withIdBqtG(boisTrunk._id, 1000000, "Mass"), items: [withIdBqtG(arbreTrunk._id, 1, "Nomb")]}
const rouletteRoot = {...withIdBqtG(rouletteTrunk._id, 1000000, "Nomb"), items: [withIdBqtG(eauTrunk._id, 1.5, "Volu"), withIdBqtG(elecTrunk._id, 20000*861244.02, "Ener")]}

const plancheBranch = {...withIdBqtG(plancheTrunk._id, 1, "Nomb"), items: [withIdBqtG(skateTrunk._id, 1, "Nomb")]}
const rouletteBranch = {...withIdBqtG(rouletteTrunk._id, 1, "Nomb"), items: [withIdBqtG(skateTrunk._id, 0.25, "Nomb")]}
const eauBranch = {...withIdBqtG(eauTrunk._id, 1500, "L"), items: [withIdBqtG(plancheTrunk._id, 1500, "Nomb"), withIdBqtG(rouletteTrunk._id, 1000000, "Nomb")]}
const elecBranch = {...withIdBqtG(elecTrunk._id, 861244.02*10, "Ener"), items: [withIdBqtG(plancheTrunk._id, 1, "Nomb"), withIdBqtG(rouletteTrunk._id, 50, "Nomb")]}
export const boisBranch = {...withIdBqtG(boisTrunk._id, 500000, "Mass"), items: [withIdBqtG(plancheTrunk._id, 1000, "Nomb"), withIdBqtG(bucheTrunk._id, 500000, "Mass")]}
const arbreBranch = {...withIdBqtG(arbreTrunk._id, 1, "Nomb"), items: [withIdBqtG(boisTrunk._id, 1000000, "Mass"), withIdBqtG(foretTrunk._id, 0.001, "Nomb")]}
const bucheBranch = {...withIdBqtG(bucheTrunk._id, 3000, "Mass"), items: [withIdBqtG(chauffageTrunk._id, 3600, "Duré")]}
const foretBranch = {...withIdBqtG(foretTrunk._id, 3, "Nomb"), items: [withId(grandeForetTrunk._id)]}
const grandeForetBranch = {...withIdBqtG(grandeForetTrunk._id, 10, "Nomb"), items: [withIdBqtG(refugeBioTrunk._id, 1, "Nomb")]}

export const database = {
    [cols.TRUNK]: [skateTrunk, plancheTrunk, boisTrunk, arbreTrunk, rouletteTrunk, elecTrunk, eauTrunk, foretTrunk, bucheTrunk, chauffageTrunk, grandeForetTrunk, refugeBioTrunk, planeteTrunk, systemeTrunk],
    [cols.ROOT]: [skateRoot, plancheRoot, boisRoot, rouletteRoot],
    [cols.BRANCH]: [plancheBranch, rouletteBranch, eauBranch, elecBranch, boisBranch, arbreBranch, bucheBranch, foretBranch, grandeForetBranch]
}
