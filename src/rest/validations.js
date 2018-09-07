import {
    BQT,
    BRANCHID,
    COLOR,
    G,
    ID,
    NAME,
    QUANTITY_BQT,
    QUANTITY_G,
    ROOTID,
    RELATIVE_TO,
    RELATIVE_TO_BQT,
    RELATIVE_TO_ID,
    TRUNKID,
    IMPACTID,
    FACETID
} from "../const/paths"
import {IS_DECIMAL, IS_NOT_RIGHT_ID, SHOULD_BE_DEFINED} from "../const/messages"
import {check, body, oneOf, param, query} from 'express-validator/check'
import {isNil, map} from 'lodash'
import {isValidIds, objectNoEx, object, objects, withIdIn} from "mongo-registry"
import {errors} from "express-blueforest"
import {grandeursKeys} from "../const/grandeurs"
import jwt from "jsonwebtoken"
import {X_ACCESS_TOKEN} from "../headers"
import {run} from 'express-blueforest'

const debug = require('debug')('api:tree:validation')
const defaultPS = 20
const grandeur = chain => chain.isIn(grandeursKeys).withMessage("should be Mass, Dens, Long, Tran...")
const mongoId = chain => chain.exists().withMessage("missing").isMongoId().withMessage("invalid mongo id").customSanitizer(objectNoEx)
const number = chain => chain.isNumeric().withMessage("must be a valid number")

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

export const validOwner = col => run(async (o, req) => {
    let filter = {_id: o._id, oid: req.user._id}
    debug("validOwner with %o", filter)
    if (await col.findOne(filter)) {
        return o
    } else {
        throw {code: "bf403"}
    }
})

export const valid = (field, optional) => {
    let chain = check(field)
    if (optional)
        chain = chain.optional()
    return chain.exists().withMessage("missing")
        .isMongoId().withMessage("invalid")
}

export const validFullname = check('fullname').isLength({min: 1, max: 100}).matches(/^.+/)
export const validMail = check("mail").isEmail().normalizeEmail().withMessage('mail invalid')
export const validWelcomeToken = check('t').exists()
export const validPassword = check('password').isLength({min: 1, max: 100}).matches(/^.+/)
export const validMessage = check("message").isString().isLength({min: 1, max: 1000}).withMessage('message trop long')


export const optionalValidBodyBqt = number(body(QUANTITY_BQT).optional())
export const validBqt = number(check(BQT))
export const optionalValidBodyG = grandeur(body(QUANTITY_G).optional())
export const optionalValidG = grandeur(check(G).optional())
export const optionalMongoId = field => mongoId(check(field).optional())

export const validBodyQuantityG = grandeur(body(QUANTITY_G))
export const validBodyQuantityBqt = number(body(QUANTITY_BQT))
export const validBodyG = grandeur(body(G))
export const validBodyBqt = number(body(BQT))
export const validMongoId = field => mongoId(check(field))
export const validRootId = validMongoId(ROOTID)
export const validTrunkId = validMongoId(TRUNKID)
export const validId = validMongoId(ID)
export const validBodyId = mongoId(body(ID))
export const validBodyTrunkId = mongoId(body(TRUNKID))
export const validBodyRootId = mongoId(body(ROOTID))
export const validBodyBranchId = mongoId(body(BRANCHID))
export const validBodyImpactId = mongoId(body(IMPACTID))
export const validBodyFacetId = mongoId(body(FACETID))

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
export const branchIdIsNotTrunkId = check(BRANCHID, IS_NOT_RIGHT_ID).custom((branch, {req}) => (!branch || !req.body.trunk) || (branch._id !== req.body.trunk._id))
export const validBodyName = body(NAME).isLength({min: 2}).matches(/^.+/)
export const validBodyColor = body(COLOR).isLength({min: 2}).matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
export const optionalValidQ = check('q').optional().exists()

export const present = (...fields) => map(fields, field => check(field, SHOULD_BE_DEFINED).exists())
export const validBodyNumber = field => body(field, IS_DECIMAL).optional().isDecimal().toFloat()

export const validPathId = mongoId(param(ID))
export const validPathTrunkId = mongoId(param(TRUNKID))
export const validPathRootId = mongoId(param(ROOTID))
export const validPathImpactId = mongoId(param(IMPACTID))
export const validPathBqt = param(BQT, IS_DECIMAL).isDecimal().toFloat()
export const validOptionalBodyName = body(NAME).optional().exists().matches(/^.+/)
export const validPathG = param(G).isIn(grandeursKeys)

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
        max: 200
    }).withMessage(`must be an integer between 1 and 200 (default to ${defaultPS})`).toInt()
]
export const optionnalAfterIdx = optionalMongoId("aidx")
export const optionnalC1 = optionalMongoId("c1")
export const optionnalC2 = optionalMongoId("c2")
export const optionnalC3 = optionalMongoId("c3")
export const optionnalC4 = optionalMongoId("c4")

export const validItem = field => [
    validMongoId(`${field}._id`),
    validBodyNumber(`${field}.quantity.bqt`)
]