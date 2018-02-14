import _ from 'lodash';
import {cols} from "../../../main/const/collections";
import {gateau} from "../../database/gateau";
import {a} from "../../database/lettres";

const lowerizeName = name => name.toLowerCase();
const name = "RATtatouille1664";

export const postTrunkSpec = {};

postTrunkSpec.req = {
    body: {name},
};
postTrunkSpec.res = {
    body: _id => ({_id, name})
};
postTrunkSpec.db = {
    expected: _id => ({
        colname: cols.TRUNK,
        doc: {
            _id,
            ...postTrunkSpec.req.body,
            name_lower: lowerizeName(postTrunkSpec.req.body.name)
        }
    })
};

const clonedName = (newId, tree) => tree.name + newId;

export const cloneTrunkSpec = {};

cloneTrunkSpec.req = {
    body: {
        sourceId: a._id
    }
};
cloneTrunkSpec.res = {
    body: _id => ({_id, name: clonedName(_id, a)})
};
cloneTrunkSpec.db = {
    expected: _id => ({
        colname: cols.TRUNK,
        doc: {
            ...(_.omit(a, ['_id', 'name', 'name_lower'])),
            _id,
            name: clonedName(_id, a),
            name_lower: lowerizeName(clonedName(_id, a))
        }
    })
};