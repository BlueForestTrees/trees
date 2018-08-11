import {withIdBqt, withId, withDbTrunk} from "test-api-express-mongo/dist/domain"
import {cols} from "../../src/const/collections"
import {co2eImpactEntry} from "./impactEntries"
import {trunksType} from "../../src/const/trunks"

export const bateauTrunk = withDbTrunk("bateau", "454503c03e77667641d99990", 1, "Tran", trunksType.TRANSPORT)
export const voitureTrunk = withDbTrunk("voiture", "554503c03e77667641d99990", 1, "Tran", trunksType.TRANSPORT)

const coImpact = {...withId(bateauTrunk._id), items: [withIdBqt(co2eImpactEntry._id, 2000000)]}
const voitureCoImpact = {...withId(voitureTrunk._id), items: [withIdBqt(co2eImpactEntry._id, 5000000)]}

export const database = {
    [cols.TRUNK]: [bateauTrunk, voitureTrunk],
    [cols.IMPACT]: [coImpact, voitureCoImpact]
}
