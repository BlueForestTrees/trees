import {BRANCH_ID, ID, NAME, ROOT_ID, SOURCE_ID, TREE_ID, TRUNK_ID} from "./paths";
import {IS_DECIMAL, IS_NOT_TRUNK_ID, IS_VALID_UNIT, SHOULD_BE_DEFINED} from "./messages";
import {check} from 'express-validator/check';
import {peekTrunk} from "../service/trunk/getTrunkService";
import _ from 'lodash';
import {grandeursKeys, shortnames} from "../service/unit/unitService";

export const valid = (field, optional) => {
    let chain = check(field);
    if (optional)
        chain = chain.optional();
    return chain.exists().withMessage("missing")
        .isMongoId().withMessage("invalid");
};
const trunkFound = (field, optional) => valid(field, optional).custom(peekTrunk).withMessage("not found");

export const validId = valid(ID);
export const validTreeId = valid(TREE_ID);
export const validGrandeur = field => check(field).isIn(grandeursKeys);
export const existingId = trunkFound(ID);
export const existingTrunkId = trunkFound(TRUNK_ID);
export const existingBranchId = trunkFound(BRANCH_ID);
export const existingRootId = trunkFound(ROOT_ID);
export const optionalExistingSourceId = trunkFound(SOURCE_ID, true);
export const rootIdIsNotTrunkId = check(ROOT_ID, IS_NOT_TRUNK_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id));
export const branchIdIsNotTrunkId = check(BRANCH_ID, IS_NOT_TRUNK_ID).custom((branch, {req}) => (!branch || !req.body.trunk) || (branch._id !== req.body.trunk._id));
export const optionalValidName = check(NAME).optional().matches(/^.+/);
export const validName = check(NAME).isLength({min:2}).matches(/^.+/);

export const present = (...fields) => _.map(fields,field=>check(field, SHOULD_BE_DEFINED).exists());
export const validUnit = field => check(field, IS_VALID_UNIT).optional().exists().isIn(shortnames);
export const validQt = field => check(field, IS_DECIMAL).optional().exists().isDecimal().toInt();