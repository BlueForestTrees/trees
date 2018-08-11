import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {optionalValidG, optionnalAfterIdx, optionnalPageSize, validQ} from "../../const/validations"
import {cols} from "../../const/collections"
import configure from "items-service"
import {col} from "mongo-registry/dist"

const router = Router()
module.exports = router

const impactEntryService = configure(() => col(cols.IMPACT_ENTRY))
const searchMixin = {color: 1, name: 1, g: 1}

router.get('/api/impactEntry/all',
    run(() => impactEntryService.find({}))
)

router.get('/api/impactEntry',
    validQ,
    optionalValidG,
    optionnalPageSize,
    optionnalAfterIdx,
    run(({q, g, aidx, ps}) => impactEntryService.search([
        {key: "name", type: "regex", value: q},
        {key: "quantity.g", value: g},
        {key: "_id", type: "gt", value: aidx}
    ], ps, searchMixin))
)

router.get('/api/impactEntry/:name',
    run(impactEntryService.findOne)
)