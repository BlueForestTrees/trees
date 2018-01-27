import {cols} from "../../src/const/collections";
import {topTrunkQt} from "../data/database";
import _ from 'lodash';

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
        sourceId: topTrunkQt._id
    }
};
clone.res = {
    body: _id => ({_id, name: clonedName(_id, topTrunkQt)})
};
clone.db = {
    expected: _id => ({
        colname: cols.TRUNK,
        doc: {
            ...(_.omit(topTrunkQt, ['_id', 'name', 'name_lower'])),
            _id,
            name: clonedName(_id, topTrunkQt),
            name_lower: lowerizeName(clonedName(_id, topTrunkQt))
        }
    })
};