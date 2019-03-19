import {
    optionnalAfterIdx,
    optionnalPageSize,
    validId,
    validIds,
    optionalValidQ,
    idsList,
    optionalValidG, optionnalC1, optionnalC2, optionnalC3, optionnalC4, optionalValidOid, validPathId, validPathOid, optionnalC0, throwit
} from "../../validations"
import {run, convert} from 'express-blueforest'
import {Router} from "express-blueforest"
import configure from "items-service"
import {col} from "mongo-registry"
import {cols} from "../../collections"
import regexEscape from "regex-escape"

const router = Router()
module.exports = router

const trunkService = configure(() => col(cols.TRUNK))
const searchMixin = {projection: {color: 1, name: 1, g: 1, quantity: 1, cat: 1, oid: 1, stores: 1}}

router.get('/api/tree/trunks',
    optionalValidQ,
    optionalValidG,
    optionalValidOid,
    optionnalPageSize,
    optionnalAfterIdx,
    optionnalC0,
    optionnalC1,
    optionnalC2,
    optionnalC3,
    optionnalC4,
    run(({q, g, aidx, ps, c0, c1, c2, c3, c4, oid}) => {

        const filter = {}

        if (q !== undefined) {
            const termFilter = {$regex: new RegExp(`^.*${regexEscape(q)}.*`, "i")}
            filter.$or = [
                {name: termFilter},
                {stores: termFilter}
            ]
        }

        if (g !== undefined) filter["quantity.g"] = g
        if (oid !== undefined) filter.oid = oid
        if (c0 !== undefined) filter["cat.c0"] = c0
        if (c1 !== undefined) filter["cat.c1"] = c1
        if (c2 !== undefined) filter["cat.c2"] = c2
        if (c3 !== undefined) filter["cat.c3"] = c3
        if (c4 !== undefined) filter["cat.c4"] = c4
        if (aidx !== undefined) filter._id = {$lt: aidx}

        return col(cols.TRUNK)
            .find(filter, searchMixin)
            .sort({_id: -1})
            .limit(ps)
            .toArray()
    })
)

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