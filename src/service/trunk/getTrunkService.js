import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import {withId} from "trees-query";
import _ from 'lodash';
import {debug} from "../../util/debug";

const trunks = () => col(cols.TRUNK);

const peekFields = {name: 1, color: 1};
const getFields = {name_lower: 0};
const searchMixin = {color: 1, name: 1, grandeur: 1, quantity: 1, type: 1};

export const peekTrunk = _id => trunks().findOne(withId(_id), peekFields);
export const getTrunk = _id => trunks().findOne({_id}, getFields);
export const getTrunks = _ids => {
    return _ids;
};
export const getQuantifiedTrunk = async (qt, unit, _id) => ({...await getTrunk(_id), quantity: {qt, unit}});

export const search = (name, type) => trunks()
    .find(prepareQuery(name, type), searchMixin)
    .sort({name_lower: 1})
    .toArray();

const prepareQuery = (name, type) => {
    const query = {};
    if (name) {
        query.name_lower = {$regex: `^${name.toLowerCase()}.*`}
    }
    if (type) {
        query.type = type;
    }
    debug("query", query);
    return query;
};