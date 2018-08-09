import {withIdBqt, withDbTrunk} from "test-api-express-mongo/dist/domain"
import {cols} from "../../src/const/collections"
import {co2eImpactEntry} from "./impactEntries"
import {trunksType} from "../../src/const/trunks"

export const bateauTrunk = withDbTrunk("bateau", "454503c03e77667641d99990", 1, "Trans", trunksType.TRANSPORT)
export const voitureTrunk = withDbTrunk("voiture", "554503c03e77667641d99990", 1, "Trans", trunksType.TRANSPORT)

const coImpact = {...withIdBqt(bateauTrunk._id, 1000), items: [withIdBqt(co2eImpactEntry._id, 2000000)]}
const voitureCoImpact = {...withIdBqt(voitureTrunk._id, 10), items: [withIdBqt(co2eImpactEntry._id, 5000000)]}

export const database = {
    [cols.TRUNK]: [bateauTrunk, voitureTrunk],
    [cols.IMPACT]: [coImpact, voitureCoImpact]
}
