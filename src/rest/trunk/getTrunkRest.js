import {optionnalAfterIdx, optionnalPageSize, validId, validIds, validQ, validT, idsList} from "../../const/validations"
import {getTrunk, getTrunks, search} from "../../service/trunk/getTrunkService"
import {run, convert} from 'express-blueforest'
import {Router} from "express-blueforest"
import {col} from "mongo-registry/dist"

const router = Router()

module.exports = router

router.get('/api/trunks',
    validQ,
    validT,
    optionnalPageSize,
    optionnalAfterIdx,
    run(({q, t, ps, aidx}) => search(q, t, ps, aidx))
)

router.get('/api/trunk/:_id',
    validId,
    run(({_id}) => getTrunk(_id))
)

router.get('/api/trunk',
    validIds,
    convert(idsList),
    run(getTrunks)
)