import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {validQ} from "../validations"
import {cols} from "../../const/collections"
import configure from "items-service"
import {col} from "mongo-registry"

const router = Router()
module.exports = router

const impactEntryService = configure(() => col(cols.IMPACT_ENTRY))
const searchMixin = {color: 1, name: 1, g: 1}

router.get('/api/impactEntry',
    validQ,
    run(({q}) => impactEntryService.search([
        {key: "name", type: "regex", value: q},
        {key: "damage", value: {$ne: true}}
    ], 0, searchMixin))
)

router.get('/api/impactEntry/:name',
    run(impactEntryService.findOne)
)