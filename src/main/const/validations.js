import {BRANCH_ID, FACET_ID, GRANDEUR, ID, IMPACT_ID, LEFT_ID, NAME, RIGHT_ID, ROOT_ID, SOURCE_ID, TREE_ID, TRUNK_ID} from "./paths";
import {IS_DECIMAL, IS_NOT_RIGHT_ID, IS_VALID_UNIT, SHOULD_BE_DEFINED} from "./messages";
import {check} from 'express-validator/check';
import _ from 'lodash';
import {getGrandeursKeys, getShortnames} from "trees-units";
import {peekTrunk} from "../service/trunk/getTrunkService";

export const valid = (field, optional) => {
    let chain = check(field);
    if (optional)
        chain = chain.optional();
    return chain.exists().withMessage("missing")
        .isMongoId().withMessage("invalid");
};
const trunkFound = (field, optional) => valid(field, optional).custom(peekTrunk).withMessage("not found");

export const validItem = key => [valid(`${key}._id`), validQt(`${key}.quantity.qt`), validUnit(`${key}.quantity.unit`)];
export const validId = valid(ID);
export const validGrandeur = check(GRANDEUR).isIn(getGrandeursKeys());
export const optionalGrandeur = field => check(field).optional().isIn(getGrandeursKeys());
export const existingId = trunkFound(ID);
export const existingTrunkId = trunkFound(TRUNK_ID);
export const existingBranchId = trunkFound(BRANCH_ID);
export const existingRootId = trunkFound(ROOT_ID);
export const optionalExistingSourceId = trunkFound(SOURCE_ID, true);
export const rootIdIsNotTrunkId = check(ROOT_ID, IS_NOT_RIGHT_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id));
export const impactIdIsNotTrunkId = check(IMPACT_ID, IS_NOT_RIGHT_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id));
export const facetIdIsNotTrunkId = check(FACET_ID, IS_NOT_RIGHT_ID).custom((facet, {req}) => (!facet || !req.body.trunk) || (facet._id !== req.body.trunk._id));
export const branchIdIsNotTrunkId = check(BRANCH_ID, IS_NOT_RIGHT_ID).custom((branch, {req}) => (!branch || !req.body.trunk) || (branch._id !== req.body.trunk._id));
export const optionalValidName = check(NAME).optional().matches(/^.+/);
export const validName = check(NAME).isLength({min: 2}).matches(/^.+/);

export const present = (...fields) => _.map(fields, field => check(field, SHOULD_BE_DEFINED).exists());
export const validUnit = field => check(field, IS_VALID_UNIT).optional().exists().isIn(getShortnames());
export const validQt = field => check(field, IS_DECIMAL).optional().exists().isDecimal().toInt();