import {withIdBqt, withId, withDbTrunk} from "test-api-express-mongo"
import {cols} from "../../src/const/collections"
import {co2eImpactEntry} from "./impactEntries"
import {trunksType} from "../../src/const/trunks"
import {object} from "test-api-express-mongo"

export const bateauTrunk = withDbTrunk("bateau", "454503c03e77667641d99990", 1, "Tran", trunksType.TRANSPORT)
export const voitureTrunk = withDbTrunk("voiture", "554503c03e77667641d99990", 1, "Tran", trunksType.TRANSPORT)

export const database = {
    [cols.TRUNK]: [bateauTrunk, voitureTrunk],
    [cols.IMPACT]: [
        {_id: object("054503c03e77667641d99990"), trunkId: bateauTrunk._id, impactId: co2eImpactEntry._id, bqt: 2000000},
        {_id: object("054503c03e77667641d99991"), trunkId: voitureTrunk._id, impactId: co2eImpactEntry._id, bqt: 5000000},
    ]
}
