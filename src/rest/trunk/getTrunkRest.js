import {optionnalAfterIdx, optionnalPageSize, validId, validIds, validQ, validT, idsList} from "../../const/validations"
import {getTrunk, getTrunks, search} from "../../service/trunk/getTrunkService"
import {run, convert} from 'express-blueforest'
import {Router} from "express-blueforest"
import configure from "items-service"
import {col} from "mongo-registry/dist"
import {cols} from "../../const/collections"

const router = Router()

module.exports = router

const trunkService = configure(() => col(cols.TRUNK))

router.get('/api/trunks',
    validQ,
    validT,
    optionnalPageSize,
    optionnalAfterIdx,
    run(({q, t, ps, aidx}) => search(q, t, ps, aidx))
)

router.get('/api/trunk/:_id',
    validId,
    run(trunkService.get)
)

router.get('/api/trunk',
    validIds,
    convert(idsList),
    run(trunkService.withIdsIn)
)