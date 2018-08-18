import {BQT, BRANCHID, COLOR, FACET_ID, FACETSIDS, G, ID, IMPACT_ID, NAME, QUANTITY_BQT, QUANTITY_G, ROOTID, RELATIVE_TO, RELATIVE_TO_BQT, RELATIVE_TO_ID, TREEID, TRUNKID, IMPACTID, FACETID} from "../const/paths"
import {IS_DECIMAL, IS_NOT_RIGHT_ID, IS_VALID_UNIT, SHOULD_BE_DEFINED} from "../const/messages"
import {check, body, oneOf, param, query} from 'express-validator/check'
import {isNil, map} from 'lodash'
import {getGrandeursKeys, getShortnames} from "../../../unit-manip/dist/index"
import {isValidIds, objectNoEx, objects} from "mongo-queries-blueforest"
import {errors} from "../../../express-blueforest/index"
import {withIdIn} from "../../../mongo-queries-blueforest/index"

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
    return withIdIn(objects(_ids))
}


export const optionalValidBodyBqt = number(body(QUANTITY_BQT).optional())
export const validBqt = number(check(BQT))
export const optionalValidBodyG = grandeur(body(QUANTITY_G).optional())
export const optionalValidG = grandeur(check(G).optional())
export const optionalMongoId = field => mongoId(check(field).optional())

export const validBodyQuantityG = grandeur(body(QUANTITY_G))
export const validBodyQuantityBqt = number(body(QUANTITY_BQT))
export const validBodyG = grandeur(body(G))
export const validBodyBqt = number(body(BQT))
export const validMongoId = field =>mongoId(check(field))
export const validBranchId = validMongoId(BRANCHID)
export const validRootId = validMongoId(ROOTID)
export const validTrunkId = validMongoId(TRUNKID)
export const validId = validMongoId(ID)
export const validBodyId = mongoId(body(ID))
export const validBodyTrunkId = mongoId(body(TRUNKID))
export const validBodyRootId = mongoId(body(ROOTID))
export const validBodyBranchId = mongoId(body(BRANCHID))
export const validBodyImpactId = mongoId(body(IMPACTID))
export const validBodyFacetId = mongoId(body(FACETID))
export const validPathFacetId = mongoId(param(FACETID))
export const validTreeId = validMongoId(TREEID)
export const validFacetIds = validMongoId(FACETSIDS)

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
export const impactIdIsNotTrunkId = check(IMPACT_ID, IS_NOT_RIGHT_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id))
export const facetIdIsNotTrunkId = check(FACET_ID, IS_NOT_RIGHT_ID).custom((facet, {req}) => (!facet || !req.body.trunk) || (facet._id !== req.body.trunk._id))
export const branchIdIsNotTrunkId = check(BRANCHID, IS_NOT_RIGHT_ID).custom((branch, {req}) => (!branch || !req.body.trunk) || (branch._id !== req.body.trunk._id))
export const validBodyName = body(NAME).isLength({min: 2}).matches(/^.+/)
export const validBodyColor = body(COLOR).isLength({min: 2}).matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
export const validQ = check('q').optional().exists()

export const present = (...fields) => map(fields, field => check(field, SHOULD_BE_DEFINED).exists())
export const validUnit = field => check(field, IS_VALID_UNIT).optional().isIn(unitsShortnames)
export const validBodyNumber = field => body(field, IS_DECIMAL).optional().isDecimal().toFloat()

export const validPathId = mongoId(param(ID))
export const validPathTrunkId = mongoId(param(TRUNKID))
export const validPathRootId = mongoId(param(ROOTID))
export const validPathImpactId = mongoId(param(IMPACTID))
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