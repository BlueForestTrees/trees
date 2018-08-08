import {validId, validateParamsItem} from "../../const/validations"

import {run} from 'express-blueforest'
import {loadImpact} from "../../service/impact/getImpactService"
import {Router} from "express-blueforest"
import {appendImpactInfos} from "../../service/impactEntry/getImpactEntryService"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const itemService = configure(() => col(cols.FACET))

router.get('/api/impact/:_id',
    validId,
    run(({_id}) => loadImpact(_id)),
    run(appendImpactInfos)
)

router.get('/api/impact/:bqt/:g/:_id',
    validateParamsItem,
    run(itemService.loadQuantified),
    run(appendImpactInfos)
)