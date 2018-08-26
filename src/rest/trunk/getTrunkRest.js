import {optionnalAfterIdx, optionnalPageSize, validId, validIds, optionalValidQ, idsList, optionalValidG} from "../validations"
import {run, convert} from 'express-blueforest'
import {Router} from "express-blueforest"
import configure from "items-service"
import {col} from "mongo-registry"
import {cols} from "../../const/collections"

const router = Router()
module.exports = router

const trunkService = configure(() => col(cols.TRUNK))
const searchMixin = {color: 1, name: 1, g: 1, quantity: 1, type: 1}

router.get('/api/trunks',
    optionalValidQ,
    optionalValidG,
    optionnalPageSize,
    optionnalAfterIdx,
    run(({q, g, aidx, ps}) => trunkService.search([
        {key: "name", type: "regex", value: q},
        {key: "quantity.g", value: g},
        {key: "_id", type: "gt", value: aidx}
    ], ps, searchMixin))
)

router.get('/api/trunk/:_id',
    validId,
    run(trunkService.get),
)

router.get('/api/trunk',
    validIds,
    convert(idsList),
    run(trunkService.findMixin({}))
)