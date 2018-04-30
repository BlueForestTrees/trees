import _ from 'lodash';
import {cols} from "../../../main/const/collections";
import {aTrunk} from "../../database/lettres";
import {withValidationError} from "../../util/testUtil";

export const postTrunkSpec = {};
postTrunkSpec.req = {body: {name: "RATtatouille1664", grandeur: "Prix"}};
postTrunkSpec.res = {body: _id => ({_id})};
postTrunkSpec.db = {
    expected: _id => ({
        colname: cols.TRUNK,
        doc: {
            _id, ...postTrunkSpec.req.body,
            name_lower: postTrunkSpec.req.body.name.toLowerCase()
        }
    })
};

export const postBadGrandeurTrunkSpec = {};
postBadGrandeurTrunkSpec.req = {body: {name: "RATtatouille1664", grandeur: "bad_grandeur"}};
postBadGrandeurTrunkSpec.res = {errorCode:422, body: withValidationError("grandeur", "body", "Invalid value", "bad_grandeur")};

const clonedName = (newId, tree) => tree.name + newId;
export const cloneTrunkSpec = {};
cloneTrunkSpec.req = {body: {sourceId: aTrunk._id}};
cloneTrunkSpec.res = {body: _id => ({_id, name: clonedName(_id, aTrunk)})};
cloneTrunkSpec.db = {
    expected: _id => ({
        colname: cols.TRUNK,
        doc: {
            ...(_.omit(aTrunk, ['_id', 'name', 'name_lower'])),
            _id,
            name: clonedName(_id, aTrunk),
            name_lower: lowerizeName(clonedName(_id, aTrunk))
        }
    })
};