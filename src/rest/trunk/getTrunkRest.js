import {
    optionnalAfterIdx,
    optionnalPageSize,
    validId,
    validIds,
    optionalValidQ,
    idsList,
    optionalValidG, optionnalC1, optionnalC2, optionnalC3, optionnalC4,
} from "../validations"
import {run, convert} from 'express-blueforest'
import {Router} from "express-blueforest"
import configure from "items-service"
import {col} from "mongo-registry"
import {cols} from "../../const/collections"
const debug = require('debug')('api:trees')

const router = Router()
module.exports = router

const trunkService = configure(() => col(cols.TRUNK))
const searchMixin = {color: 1, name: 1, g: 1, quantity: 1, type: 1}

router.get('/api/tree/trunks',
    optionalValidQ,
    optionalValidG,
    optionnalPageSize,
    optionnalAfterIdx,
    optionnalC1,
    optionnalC2,
    optionnalC3,
    optionnalC4,
    run(({q, g, aidx, ps, c1, c2, c3, c4}) => trunkService.search([
        {key: "name", type: "regex", value: q},
        {key: "quantity.g", value: g},
        {key: "cat.c1", value: c1},
        {key: "cat.c2", value: c2},
        {key: "cat.c3", value: c3},
        {key: "cat.c4", value: c4},
        {key: "_id", type: "gt", value: aidx}
    ], ps, searchMixin))
)

router.get('/api/tree/trunk/:_id',
    validId,
    run(trunkService.get),
)

router.get('/api/tree/trunk',
    validIds,
    convert(idsList),
    run(trunkService.findMixin({}))
)