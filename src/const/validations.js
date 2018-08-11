import {BQT, BRANCH_ID, COLOR, FACET_ID, FACETSIDS, G, ID, IMPACT_ID, NAME, QUANTITY_BQT, QUANTITY_G, ROOT_ID, ROOT_RELATIVE_TO, ROOT_RELATIVE_TO_DISQT, ROOT_RELATIVE_TO_DISQT_QT, ROOT_RELATIVE_TO_DISQT_UNIT, ROOT_RELATIVE_TO_ID, ROOT_RELATIVE_TO_REFQT, ROOT_RELATIVE_TO_REFQT_QT, ROOT_RELATIVE_TO_REFQT_UNIT, TREEID, TRUNK_ID,} from "./paths"
import {IS_DECIMAL, IS_NOT_RIGHT_ID, IS_VALID_UNIT, SHOULD_BE_DEFINED} from "./messages"
import {check, body, oneOf, param, query} from 'express-validator/check'
import {isNil, map} from 'lodash'
import {getGrandeursKeys, getShortnames} from "unit-manip"
import {trunksType} from "./trunks"
import {isValidIds, objectNoEx, objects} from "mongo-queries-blueforest"
import {errors} from "express-blueforest"

const defaultPS = 20
const unitsShortnames = getShortnames()
const grandeur = chain => chain.isIn(getGrandeursKeys()).withMessage("should be Mass, Dens, Long, Tran...")
const mongoId = chain => chain.exists().withMessage("missing").isMongoId().withMessage("invalid mongo id").customSanitizer(objectNoEx)
const number = chain => chain.isNumeric().withMessage("must be a valid number")



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

export const validIds = query("_ids").exists()
export const idsList = ({_ids}) => {
    if (!_ids) {
        throw new errors.ValidationError("_ids query params is missing")
    }
    if (!isValidIds(_ids)) {
        throw new errors.ValidationError("_ids query params are invalid")
    }
    return objects(_ids)
}


export const optionalValidBodyBqt = number(body(QUANTITY_BQT).optional())
export const optionalValidBodyG = grandeur(body(QUANTITY_G).optional())
export const optionalMongoId = field => mongoId(check(field).optional())

export const validBodyG = grandeur(body(G))
export const validMongoId = field =>mongoId(check(field))
export const validBranchId = validMongoId(BRANCH_ID)
export const validRootId = validMongoId(ROOT_ID)
export const validTrunkId = validMongoId(TRUNK_ID)
export const validId = validMongoId(ID)
export const validBodyId = mongoId(body(ID))
export const validTreeId = validMongoId(TREEID)
export const validFacetIds = validMongoId(FACETSIDS)

export const noRelativeTo = check(ROOT_RELATIVE_TO).not().exists()

export const validRelativeTo = oneOf([
    [
        noRelativeTo
    ],
    [
        body(ROOT_RELATIVE_TO).exists(),
        mongoId(body(ROOT_RELATIVE_TO_ID)),
        body(ROOT_RELATIVE_TO_REFQT).exists(),
        number(body(ROOT_RELATIVE_TO_REFQT_QT)),
        body(ROOT_RELATIVE_TO_REFQT_UNIT).isIn(unitsShortnames),
        body(ROOT_RELATIVE_TO_DISQT).exists(),
        body(ROOT_RELATIVE_TO_DISQT_QT).isNumeric(),
        body(ROOT_RELATIVE_TO_DISQT_UNIT).isIn(unitsShortnames),
    ]
])


export const rootIdIsNotTrunkId = check(ROOT_ID, IS_NOT_RIGHT_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id))
export const impactIdIsNotTrunkId = check(IMPACT_ID, IS_NOT_RIGHT_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id))
export const facetIdIsNotTrunkId = check(FACET_ID, IS_NOT_RIGHT_ID).custom((facet, {req}) => (!facet || !req.body.trunk) || (facet._id !== req.body.trunk._id))
export const branchIdIsNotTrunkId = check(BRANCH_ID, IS_NOT_RIGHT_ID).custom((branch, {req}) => (!branch || !req.body.trunk) || (branch._id !== req.body.trunk._id))
export const validBodyName = body(NAME).isLength({min: 2}).matches(/^.+/)
export const validBodyColor = body(COLOR).isLength({min: 2}).matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
export const validQ = check('q').optional().exists()
export const validT = check("t").optional().isIn(Object.values(trunksType))

export const present = (...fields) => map(fields, field => check(field, SHOULD_BE_DEFINED).exists())
export const validUnit = field => check(field, IS_VALID_UNIT).optional().isIn(unitsShortnames)
export const validBodyNumber = field => body(field, IS_DECIMAL).optional().isDecimal().toFloat()

export const validPathId = mongoId(param(ID))
export const validPathBqt = param(BQT, IS_DECIMAL).isDecimal().toFloat()
export const validOptionalBodyName = body(NAME).optional().exists().matches(/^.+/)
export const validPathG = param(G).isIn(getGrandeursKeys())

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
    check("ps").isInt({min: 1, max: 200}).withMessage(`must be an integer between 1 and 200 (default to ${defaultPS})`).toInt()
]
export const optionnalAfterIdx = optionalMongoId("aidx")

export const validItem = field => [
    validMongoId(`${field}._id`),
    validBodyNumber(`${field}.quantity.bqt`)
]