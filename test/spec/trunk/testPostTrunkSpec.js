import _ from 'lodash';
import {cols} from "../../../src/const/collections";
import {aTrunk} from "../../database/lettres";
import {withValidationError} from "trees-test/dist/domain";
import {createStringObjectId} from "trees-test/dist/util";

const trunk = {_id: createStringObjectId(), color: "#FFCC00", name: "RATtatouille1664"};
export const postTrunkSpec = {
    req: {
        url: "/api/trunk",
        method: "POST",
        body: trunk
    },
    db: {
        expected: {
            colname: cols.TRUNK,
            doc: {
                ...trunk,
                name_lower: trunk.name.toLowerCase()
            }
        }
    }
};

const badTrunk = {_id: createStringObjectId()+"ee", color: "#FFCC00", name: "RATtatouille1664"};
export const postBadIdTrunkSpec = {
    req: {
        url: "/api/trunk",
        method: "POST",
        body: badTrunk
    },
    res: {
        code: 400,
        bodypath: {path: "$.errors._id.msg", value: "invalid"}
    },
    db: {
        expected: {
            colname: cols.TRUNK,
            missingDoc: badTrunk
        }
    }
};

const transportTrunk = {_id: createStringObjectId(), color: "#FFCC00", name: "RATtatouille1664", type: "TR"};
export const postTransportTrunkSpec = {
    req: {
        url: "/api/trunk",
        method: "POST",
        body: transportTrunk
    },
    db: {
        expected: {
            colname: cols.TRUNK,
            doc: {
                ...transportTrunk,
                name_lower: transportTrunk.name.toLowerCase()
            }
        }
    }
};

export const postBadColorTrunkSpec = {
    req: {
        url: "/api/trunk",
        method: "POST",
        body: {color: "#FFFFF", name: "RATtatouille1664", grandeur: "Dens"}
    },
    res: {
        code: 400,
        bodypath: [
            {path: "$.errors.color.msg", value: "Invalid value"},
            {path: "$.errors.color.value", value: "#FFFFF"},
        ]
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