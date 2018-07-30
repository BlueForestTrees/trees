import {BRANCH_ID, COLOR, FACET_ID, GRANDEUR, ID, IMPACT_ID, NAME, ROOT_ID, ROOT_RELATIVE_TO, ROOT_RELATIVE_TO_DISQT, ROOT_RELATIVE_TO_DISQT_QT, ROOT_RELATIVE_TO_DISQT_UNIT, ROOT_RELATIVE_TO_ID, ROOT_RELATIVE_TO_REFQT, ROOT_RELATIVE_TO_REFQT_QT, ROOT_RELATIVE_TO_REFQT_UNIT, ROOTID, SOURCE_ID, TRUNK_ID, TRUNKID, TYPE} from "./paths";
import {IS_DECIMAL, IS_NOT_RIGHT_ID, IS_VALID_UNIT, SHOULD_BE_DEFINED} from "./messages";
import {check, body, oneOf} from 'express-validator/check';
import _ from 'lodash';
import {getGrandeursKeys, getShortnames} from "trees-units";
import {trunksType} from "./trunks";
import {isValidIds, objectNoEx, objects} from "trees-query";
import {errors} from "trees-express";

const unitsShortnames = getShortnames();

export const valid = (field, optional) => {
    let chain = check(field);
    if (optional)
        chain = chain.optional();
    return chain.exists().withMessage("missing")
        .isMongoId().withMessage("invalid");
};

export const validFullname = check('fullname').isLength({min: 1, max: 100}).matches(/^.+/);
export const validMail = check("mail").isEmail().normalizeEmail().withMessage('mail invalid');
export const validWelcomeToken = check('t').exists();
export const validPassword = check('password').isLength({min: 1, max: 100}).matches(/^.+/);
export const validMessage = check("message").isString().isLength({min: 1, max: 1000}).withMessage('message trop long');
export const validItem = key => [valid(`${key}._id`), validQt(`${key}.quantity.qt`), validUnit(`${key}.quantity.unit`)];

export const validIds = (req, res, next) => {
    check("_ids").exists()(req, res, next);
    let _ids = req.query._ids;
    if (!_ids) {
        throw new errors.ValidationError("_ids query params is missing");
    }
    if (!isValidIds(_ids)) {
        throw new errors.ValidationError("_ids query params are invalid");
    }
    req.query._ids = objects(_ids);
};

export const validGrandeur = check(GRANDEUR).isIn(getGrandeursKeys());

const validMongoId = field => check(field).exists().withMessage("missing")
    .isMongoId().withMessage("invalid")
    .customSanitizer(objectNoEx);
export const validBranchId = validMongoId(BRANCH_ID);
export const validRootId = validMongoId(ROOT_ID);
export const validTrunkId = validMongoId(TRUNK_ID);
export const validId = validMongoId(ID);

export const noRelativeTo = check(ROOT_RELATIVE_TO).not().exists();

export const validRelativeTo = oneOf([
    [
        noRelativeTo
    ],
    [
        body(ROOT_RELATIVE_TO).exists(),
        body(ROOT_RELATIVE_TO_ID).isMongoId(),
        body(ROOT_RELATIVE_TO_REFQT).exists(),
        body(ROOT_RELATIVE_TO_REFQT_QT).isNumeric(),
        body(ROOT_RELATIVE_TO_REFQT_UNIT).isIn(unitsShortnames),
        body(ROOT_RELATIVE_TO_DISQT).exists(),
        body(ROOT_RELATIVE_TO_DISQT_QT).isNumeric(),
        body(ROOT_RELATIVE_TO_DISQT_UNIT).isIn(unitsShortnames),
    ]
]);

export const rootIdIsNotTrunkId = check(ROOT_ID, IS_NOT_RIGHT_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id));
export const impactIdIsNotTrunkId = check(IMPACT_ID, IS_NOT_RIGHT_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id));
export const facetIdIsNotTrunkId = check(FACET_ID, IS_NOT_RIGHT_ID).custom((facet, {req}) => (!facet || !req.body.trunk) || (facet._id !== req.body.trunk._id));
export const branchIdIsNotTrunkId = check(BRANCH_ID, IS_NOT_RIGHT_ID).custom((branch, {req}) => (!branch || !req.body.trunk) || (branch._id !== req.body.trunk._id));
export const validName = check(NAME).isLength({min: 2}).matches(/^.+/);
export const validColor = check(COLOR).isLength({min: 2}).matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
export const validQ = check('q').optional().exists();
export const validT = check("t").optional().isIn(Object.values(trunksType));
export const optionalValidType = check(TYPE).optional().isIn(Object.values(trunksType));

export const present = (...fields) => _.map(fields, field => check(field, SHOULD_BE_DEFINED).exists());
export const validUnit = field => check(field, IS_VALID_UNIT).optional().isIn(unitsShortnames);
export const validQt = field => check(field, IS_DECIMAL).optional().isDecimal().toFloat();

