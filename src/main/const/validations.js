import {ID, NAME, ROOT_ID, SOURCE_ID, TREE_ID, TRUNK_ID} from "./paths";
import {IS_DECIMAL, IS_NOT_TRUNK_ID, IS_VALID_UNIT, SHOULD_BE_DEFINED, SHOULD_NOT_BE_DEFINED} from "./messages";
import {check} from 'express-validator/check';
import {peekTrunk} from "../service/trunk/getTrunkService";
import {shortnames} from "../service/grandeursService";
import _ from 'lodash';

export const valid = (field, optional) => {
    let chain = check(field);
    if (optional)
        chain = chain.optional();
    return chain.exists().withMessage("missing")
        .isMongoId().withMessage("invalid");
};
const found = (field, optional) => valid(field, optional).custom(peekTrunk).withMessage("not found");

export const validId = valid(ID);
export const validTreeId = valid(TREE_ID);
export const existingId = found(ID);
export const existingTrunkId = found(TRUNK_ID);
export const existingRootId = found(ROOT_ID);
export const optionalExistingSourceId = found(SOURCE_ID, true);
export const rootIdIsNotTrunkId = check(ROOT_ID, IS_NOT_TRUNK_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id));
export const optionalValidName = check(NAME).optional().matches(/^.+/);
export const optionalUnit = field => check(field, IS_VALID_UNIT).optional().exists().isIn(shortnames);
export const optionalDecimal = field => check(field, IS_DECIMAL).optional().exists().isDecimal();
export const present = (...fields) => _.map(fields,field=>check(field, SHOULD_BE_DEFINED).exists());
export const absent = (...fields) =>  _.map(fields,field=>check(field, SHOULD_NOT_BE_DEFINED).not().exists());
export const presentUnit = field => check(field, IS_VALID_UNIT).exists().isIn(shortnames);
export const presentQt = field => check(field, IS_DECIMAL).exists().isDecimal();