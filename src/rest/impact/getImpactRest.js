import {validId} from "../../const/validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const impactService = configure(() => col(cols.IMPACT))
const impactEntryService = configure(() => col(cols.IMPACT_ENTRY))

router.get('/api/impact/:_id',
    validId,
    run(impactService.get),
    run(impactEntryService.appendItemsInfos({name: 1, color: 1}))
)