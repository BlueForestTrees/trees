import {
    validId,
    validPathId, validPathOid,
    throwit
} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import configure from "items-service"
import {col} from "mongo-registry"
import {cols} from "../../collections"

const router = Router()
module.exports = router

const trunkService = configure(() => col(cols.TRUNK))

router.get('/api/tree/trunk/:_id',
    validId,
    run(trunkService.get),
)

//validation du oid. 404 si _id pas trouvé.
router.get('/api/tree/:_id/owner/:oid',
    validPathId,
    validPathOid,
    run(({oid, _id}) => col(cols.TRUNK)
        .findOne({_id, oid}, {projection: {_id: 1}})
        .then(res => !!res || throwit({code: "bf404"})))
)