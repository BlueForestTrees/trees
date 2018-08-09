import {validId} from "../../const/validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const itemService = configure(() => col(cols.FACET))
const impactEntryService = configure(() => col(cols.FACET_ENTRY))

router.get('/api/impact/:_id',
    validId,
    run(itemService.get),
    run(impactEntryService.appendItemsInfos({name: 1, color: 1}))
)