import {ble, farine, gateau} from "../../scenario/integ/testIntegDatabase";
import _ from 'lodash';
import {cols} from "../../../main/const/collections";
import {oneModifiedResponse} from "../testCommonData";

const lowerizeName = name => name.toLowerCase();
const name = "RATtatouille1664";

export const post = {};

post.req = {
    body: {name},
};
post.res = {
    body: _id => ({_id, name})
};
post.db = {
    expected: _id => ({
        colname: cols.TRUNK,
        doc: {
            _id,
            ...post.req.body,
            name_lower: lowerizeName(post.req.body.name)
        }
    })
};

const clonedName = (newId, tree) => tree.name + newId;

export const clone = {};

clone.req = {
    body: {
        sourceId: gateau._id
    }
};
clone.res = {
    body: _id => ({_id, name: clonedName(_id, gateau)})
};
clone.db = {
    expected: _id => ({
        colname: cols.TRUNK,
        doc: {
            ...(_.omit(gateau, ['_id', 'name', 'name_lower'])),
            _id,
            name: clonedName(_id, gateau),
            name_lower: lowerizeName(clonedName(_id, gateau))
        }
    })
};