import {ROOT_ID, TRUNK_ID, TRUNK_QT} from "./paths";
import {IS_PRESENT_VALID_FOUND, IS_NOT_TRUNK_ID} from "./messages";

import {check} from 'express-validator/check';
import trunks from "../service/trunks";

export const validId = check('_id').exists().isMongoId();
export const validTreeId = check('treeId').exists().isMongoId();

export const existingId = check('_id',IS_PRESENT_VALID_FOUND).exists().isMongoId().custom(trunks.contains);
export const existingTrunkId = check(TRUNK_ID, IS_PRESENT_VALID_FOUND).exists().isMongoId().custom(trunks.contains);
export const existingRootId = check(ROOT_ID, IS_PRESENT_VALID_FOUND).exists().isMongoId().custom(trunks.contains);

export const rootIdIsNotTrunkId = check(ROOT_ID, IS_NOT_TRUNK_ID).custom((root, {req}) => (!root || !req.body.trunk) || (root._id !== req.body.trunk._id));