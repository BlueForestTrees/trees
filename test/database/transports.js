import {withIdBqtG, withDbTrunk} from "test-api-express-mongo/dist/domain"
import {cols} from "../../src/const/collections"
import {co2eImpactEntry} from "./impactEntries"
import {trunksType} from "../../src/const/trunks"

export const bateauTrunk = withDbTrunk("bateau", "454503c03e77667641d99990", 1, "Trans", trunksType.TRANSPORT)
export const voitureTrunk = withDbTrunk("voiture", "554503c03e77667641d99990", 1, "Trans", trunksType.TRANSPORT)

const coImpact = {...withIdBqtG(bateauTrunk._id, 1000, "Trans"), items: [withIdBqtG(co2eImpactEntry._id, 2000000, "Mass")]}
const voitureCoImpact = {...withIdBqtG(voitureTrunk._id, 10, "Trans"), items: [withIdBqtG(co2eImpactEntry._id, 5000000, "Mass")]}

export const database = {
    [cols.TRUNK]: [bateauTrunk, voitureTrunk],
    [cols.IMPACT]: [coImpact, voitureCoImpact]
}
