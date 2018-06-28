import _ from 'lodash';
import {cols} from "../../../main/const/collections";
import {aTrunk} from "../../database/lettres";
import {withValidationError} from "../../util/testUtil";

export const postTrunkSpec = {};
postTrunkSpec.req = {body: {color:"#FFCC00", name: "RATtatouille1664", grandeur: "Prix"}};
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
postBadGrandeurTrunkSpec.req = {body: {color:"#FFFFFF", name: "RATtatouille1664", grandeur: "bad_grandeur"}};
postBadGrandeurTrunkSpec.res = {errorCode:400, body: withValidationError("grandeur", "body", "Invalid value", "bad_grandeur")};

export const postBadColorTrunkSpec = {};
postBadColorTrunkSpec.req = {body: {color:"#FFFFF", name: "RATtatouille1664", grandeur: "Dens"}};
postBadColorTrunkSpec.res = {errorCode:400, body: withValidationError("color", "body", "Invalid value", "#FFFFF")};

const cloneName = (newId, tree) => tree.name + newId;
export const cloneTrunkSpec = {};
cloneTrunkSpec.req = {body: {sourceId: aTrunk._id}};
cloneTrunkSpec.res = {body: _id => ({_id, name: cloneName(_id, aTrunk)})};
cloneTrunkSpec.db = {
    expected: _id => ({
        colname: cols.TRUNK,
        doc: {
            ...(_.omit(aTrunk, ['_id', 'name', 'name_lower'])),
            _id,
            name: cloneName(_id, aTrunk),
            name_lower: lowerizeName(cloneName(_id, aTrunk))
        }
    })
};