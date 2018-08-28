import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {optionalValidQ} from "../validations"
import {cols} from "../../const/collections"
import configure from "items-service"
import {col} from "mongo-registry"
import regexEscape from "regex-escape"

const router = Router()
module.exports = router

const impactEntryService = configure(() => col(cols.IMPACT_ENTRY))
const searchMixin = {color: 1, name: 1, g: 1}

router.get('/api/tree/impactEntry',
    optionalValidQ,
    run(({q}) => impactEntryService.search(
        {
            name:{$regex: `^.*${regexEscape(q)}.*`},
            damage:{$ne: true}
        },
        0, searchMixin))
)

router.get('/api/tree/impactEntry/:name',
    run(impactEntryService.findOne)
)