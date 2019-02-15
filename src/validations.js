import {check, body, oneOf, param} from 'express-validator/check'
import {isNil, map} from 'lodash'
import {isValidIds, objectNoEx, object, withIdIn} from "mongo-registry"
import {errors} from "express-blueforest"
import jwt from "jsonwebtoken"
import {X_ACCESS_TOKEN} from "./headers"
import {run} from 'express-blueforest'

const debug = require('debug')('api:tree:validation')
const defaultPS = 20
const grandeur = chain => chain.isIn(grandeursKeys).withMessage("should be Mass, Dens, Long, Tran...")
const mongoId = chain => chain.exists().withMessage("missing").isMongoId().withMessage("invalid mongo id").customSanitizer(objectNoEx)
const number = chain => chain.exists().custom(v => !isNaN(Number.parseFloat(v))).withMessage("must be a valid number").customSanitizer(Number.parseFloat)

const ID = '_id'
const OID = 'oid'
const TRUNKID = 'trunkId'
const ROOTID = 'rootId'
const RELATIVE_TO = 'relativeTo'
const RELATIVE_TO_ID = 'relativeTo._id'
const RELATIVE_TO_BQT = 'relativeTo.bqt'
const NAME = 'name'
const COLOR = 'color'
const G = 'g'
const QUANTITY_BQT = 'quantity.bqt'
const QUANTITY_G = 'quantity.g'
const BQT = 'bqt'
const IS_NOT_RIGHT_ID = 'ids must be different'
const grandeursKeys = ["PNOF", "PDF", "DALY", "CTUh", "CTUe", "Ene1", "Ene2", "Dens", "Nomb", "Volu", "Duré", "Mass", "Surf", "Long", "Pri1", "Pri2", "Tran"]

export const appendOid = (col, left, right) => async o => {
    const item = await col.findOne({[left]: o[right]}, {oid: 1})
    if (item) {
        o.oid = item.oid
        return o
    } else {
        throw {code: "bf404"}
    }
}

export const validUser = run((o, req) => {
    let token = jwt.decode(req.headers[X_ACCESS_TOKEN])
    if (!token || !token.user) {
        throw {code: "bf401"}
    }
    req.user = token.user
    req.user._id = object(req.user._id)
    debug("user %o", req.user)
    return o
})

export const setUserIdIn = field => (o, req) => {
    o[field] = req.user._id
    return o
}

export const validOwner = (col, field = "_id") => run(async (o, req) => {
    let filter = {_id: o[field]}
    const doc = await col.findOne(filter)
    if (doc) {
        if (req.user._id.equals(doc.oid)) {
            debug("valid owner user %o, doc %o", req.user._id, doc._id)
            return o
        } else if (req.user.rights && req.user.rights.charAt(0) === 'G') {
            debug("valid god user %o, doc %o", req.user._id, doc._id)
            return o
        } else {
            debug("invalid owner user %o, doc %o", req.user._id, doc._id)
            throw {code: "bf403"}
        }
    } else {
        debug("doc not found user %o, doc %o", req.user._id, doc._id)
        throw {code: "bf404"}
    }
})

export const optionalValidBodyBqt = number(body(QUANTITY_BQT).optional())
export const optionalValidBodyG = grandeur(body(QUANTITY_G).optional())
export const optionalValidG = grandeur(check(G).optional())
export const optionalMongoId = field => mongoId(check(field).optional())

export const validBodyQuantityG = grandeur(body(QUANTITY_G))
export const validBodyQuantityBqt = number(body(QUANTITY_BQT))
export const validBodyBqt = number(body(BQT))
export const validMongoId = field => mongoId(check(field))
export const optionalValidOid = optionalMongoId(OID)
export const validRootId = validMongoId(ROOTID)
export const validTrunkId = validMongoId(TRUNKID)
export const validId = validMongoId(ID)
export const validBodyId = mongoId(body(ID))
export const validBodyTrunkId = mongoId(body(TRUNKID))
export const validBodyRootId = mongoId(body(ROOTID))


export const noBodyRelativeTo = body(RELATIVE_TO).not().exists()

export const validBodyOptRelativeTo = oneOf([
    [
        noBodyRelativeTo
    ],
    [
        body(RELATIVE_TO).exists(),
        mongoId(body(RELATIVE_TO_ID)),
        number(body(RELATIVE_TO_BQT)),
    ]
])


export const rootIdIsNotTrunkId = check(ROOTID, IS_NOT_RIGHT_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id))
export const validBodyName = body(NAME).isLength({min: 2}).matches(/^.+/)
export const validBodyColor = body(COLOR).isLength({min: 2}).matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
export const optionalValidQ = check('q').optional().exists()

export const validPathId = mongoId(param(ID))
export const validPathOid = mongoId(param(OID))
export const validPathTrunkId = mongoId(param(TRUNKID))
export const validOptionalTrunkId = mongoId(check(TRUNKID)).optional()
export const validPathRootId = mongoId(param(ROOTID))
export const validOptionalBodyName = body(NAME).optional().exists().matches(/^.+/)

export const validOptionalBodyBqtG = [
    optionalValidBodyG,
    optionalValidBodyBqt,
    (req, res, next) => {
        if (req.body.quantity) {
            if (!req.body.quantity.bqt !== !req.body.quantity.g) {
                throw new errors.ValidationError("bqt and g must be all or none defined")
            }
        }
        next()
    }
]


export const optionnalPageSize = [
    (req, res, next) => {
        if (isNil(req.params.ps)) {
            req.params.ps = defaultPS
        }
        next()
    },
    check("ps").isInt({
        min: 1,
        max: 30
    }).withMessage(`must be an integer between 1 and 30 (default to ${defaultPS})`).toInt()
]
export const optionnalAfterIdx = optionalMongoId("aidx")
export const optionnalC0 = optionalMongoId("c0")
export const optionnalC1 = optionalMongoId("c1")
export const optionnalC2 = optionalMongoId("c2")
export const optionnalC3 = optionalMongoId("c3")
export const optionnalC4 = optionalMongoId("c4")

export const validPathBqt = number(param(BQT))
export const validPathAttributeId = mongoId(param("attrId"))
export const validLimit = number(param("limit")).isLength({min: 1, max: 15})
