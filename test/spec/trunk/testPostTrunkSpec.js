import _ from 'lodash';
import {cols} from "../../../src/const/collections";
import {aTrunk} from "../../database/lettres";
import {withValidationError} from "trees-test/dist/domain";

export const postTrunkSpec = {};
postTrunkSpec.req = {body: {color:"#FFCC00", name: "RATtatouille1664"}};
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

export const postTransportTrunkSpec = {};
postTransportTrunkSpec.req = {body: {color:"#FFCC00", name: "RATtatouille1664", type:"TR"}};
postTransportTrunkSpec.res = {body: _id => ({_id})};
postTransportTrunkSpec.db = {
    expected: _id => ({
        colname: cols.TRUNK,
        doc: {
            _id, ...postTransportTrunkSpec.req.body,
            name_lower: postTransportTrunkSpec.req.body.name.toLowerCase()
        }
    })
};

export const postBadColorTrunkSpec = {
    req: {
        url: "/api/trunk",
        method: "POST",
        body: {color: "#FFFFF", name: "RATtatouille1664", grandeur: "Dens"}
    },
    res: {
        code: 400, body: withValidationError("color", "body", "Invalid value", "#FFFFF")
    }
};

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