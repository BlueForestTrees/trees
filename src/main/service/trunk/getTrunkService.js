import {cols} from "../../const/collections";
import {col} from "../../repo";
import {withId} from "../../util/query";

const trunks = () => col(cols.TRUNK);

const peekFields = {name: 1};
const getFields = {name_lower: 0};
const searchMixin = {name: 1};

export const peekTrunk = _id => trunks().findOne(withId(_id), peekFields);
export const getTrunk = _id => trunks().findOne(withId(_id), getFields);

export const searchOrAll = (grandeur, name) => {
    if (grandeur || name) {
        return search({grandeur, name});
    } else {
        return all();
    }
};
export const search = search => trunks()
    .find({
        name_lower: {$regex: `^${search.name.toLowerCase()}.*`},
        grandeur: search.grandeur || undefined
    }, searchMixin)
    .sort({name_lower: 1})
    .toArray();

export const all = () => trunks().find({}).toArray();
