import {cols} from "../../const/collections";
import {col} from "../../db";
import {withId} from "trees-query";
import _ from 'lodash';

const trunks = () => col(cols.TRUNK);

const peekFields = {name: 1};
const getFields = {name_lower: 0};
const searchMixin = {name: 1, grandeur: 1};

export const peekTrunk = _id => trunks().findOne(withId(_id), peekFields);
export const getTrunk = _id => trunks().findOne(withId(_id), getFields);

export const search = name => trunks()
    .find({
        name_lower: {$regex: `^${name.toLowerCase()}.*`},
        grandeur: {"$exists": true, "$ne": null}
    }, searchMixin)
    .sort({name_lower: 1})
    .toArray();

export const appendTrunkNames = items => Promise.all(
    _.map(items, item => peekTrunk(item._id)
        .then(t => ({...item, name: (t && t.name) || "inconnu"}))
    )
);