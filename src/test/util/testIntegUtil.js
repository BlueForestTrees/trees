import {appPromise} from "../../main/index";
import chai, {expect} from 'chai';
import {initDatabase, updateDb} from "./testIntegDatabase";

import _ from 'lodash';
import {ObjectID} from "mongodb";

let app = null;

export const request = () => chai.request(app);

export const init = async () => {
    await initDatabase();
    app = await appPromise;
};
export const run = job => done => {
    job()
        .then(() => done())
        .catch(err => done(err));
};
export const run2 = (job, spec) => done => {
    before(spec)
        .then(spec => job(spec))
        .then(() => done())
        .catch(err => done(err));
};

const before = async spec => {
    if (spec.db && spec.db.preChange) {
        await updateDb(spec.db.preChange);
    }
    return spec;
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
export const withEntry = (_id, name, grandeur) => ({_id, name, grandeur});

export const setQuantity = (trunk, qt, unit) => {
    unit = unit ? unit : trunk.quantity.unit;
    trunk.quantity = {qt, unit};
};
export const removeItemQuantity = (item, subItemId) => ({
    ..._.omit(item, "items"),
    items: _.map(item.items, subitem => subitem._id === subItemId ? _.omit(subitem, "quantity") : subitem)
});


export const clon = obj => _.cloneDeep(obj);

export const remove = (obj, prop, criteria) => {
    const clone = clon(obj);
    clone[prop] = _.without(clone[prop], _.find(clone[prop], criteria));
    return clone;
};

export const replaceItem = (obj, prop, value) => {
    const result = remove(obj, prop, {_id: value._id});
    result[prop].push(value);
    return result;
};
