import {validPathTrunkId} from "../validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry"
import configure from "items-service"

const router = Router()

module.exports = router

const impactService = configure(() => col(cols.IMPACT))
const impactEntryService = configure(() => col(cols.IMPACT_ENTRY))

router.get('/api/tree/impact/:trunkId',
    validPathTrunkId,
    run(({trunkId}) => ({trunkId})),
    run(impactService.findMixin({trunkId: 0})),
    run(impactEntryService.append(
        "impactId",
        {name: 1, color: 1, g: 1},
        (impact, impactEntry) => ({
            _id: impact._id,
            impactId: impact.impactId,
            name: impactEntry.name,
            color: impactEntry.color,
            quantity: {bqt: impact.bqt, g: impactEntry.g, eq: impactEntry.eq}
        })
    ))
)