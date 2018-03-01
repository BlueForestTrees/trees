import _ from 'lodash';
import {expect} from 'chai';
import {ObjectID} from "mongodb";

export const run = job => done => {
    job()
        .then(() => done())
        .catch(err => done(err));
};
export const debug = (...obj) => {
    try {
        console.log(JSON.stringify(obj, null, 4));
    } catch (e) {
        console.log(obj);
    }
    return Promise.resolve(...obj);
};

export const withQtCoef = (items, coef) => _.forEach(items, root => root.quantity.qt *= coef || 2);
export const withoutQuantity = items => _.map(items, item => _.omit(item, "quantity"));
export const withItem = (_id, qt, unit) => ({_id, ...withQuantity(qt, unit)});
export const withItemNoQt = _id => ({_id});
export const withItemRequest = (_id, qt, unit) => ({_id, qt, unit});
export const withQuantity = (qt, unit) => ({quantity: {qt, unit}});
export const withTrunk = (name, _id, qt, unit) => ({name, name_lower: name.toLowerCase(), ...withItem(_id, qt, unit)});
export const withTrunkNoQt = (name, _id) => ({_id, name, name_lower: name.toLowerCase()});
export const withTrunkAuto = (name, qt, unit) => withTrunk(name, ObjectID().toString(), qt, unit);

export const setQuantity = (trunk, qt, unit) => {
    unit = unit ? unit : trunk.quantity.unit;
    trunk.quantity = {qt, unit};
};
export const removeItemQuantity = (item, subItemId) => ({
    ..._.omit(item, "items"),
    items: _.map(item.items, subitem => subitem._id === subItemId ? _.omit(subitem, "quantity") : subitem)
});