import {withIdQuantity, withTrunk} from "test-api-express-mongo/dist/domain"
import {cols} from "../../src/const/collections"
import {co2eImpactEntry} from "./impactEntries"
import {trunksType} from "../../src/const/trunks"

export const bateauTrunk = withTrunk("bateau", "454503c03e77667641d99990", 1, "t*km", trunksType.TRANSPORT)
export const voitureTrunk = withTrunk("voiture", "554503c03e77667641d99990", 1, "t*km", trunksType.TRANSPORT)

const coImpact = {...withIdQuantity(bateauTrunk._id, 1000, "t*km"), items: [withIdQuantity(co2eImpactEntry._id, 2000, "kg")]}
const voitureCoImpact = {...withIdQuantity(voitureTrunk._id, 10, "t*km"), items: [withIdQuantity(co2eImpactEntry._id, 5000, "kg")]}

export const database = {
    [cols.TRUNK]: [bateauTrunk, voitureTrunk],
    [cols.IMPACT]: [coImpact, voitureCoImpact]
}
