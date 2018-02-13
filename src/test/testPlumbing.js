import _ from 'lodash';
import {expect} from 'chai';

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

export const withDoubleQt = items => _.forEach(items, root => root.quantity.qt *= 2);
export const withoutQuantity = items => _.map(items, item => _.omit(item, "quantity"));

export const withQuantity = (qt, unit) => ({quantity: {qt, unit}});
export const withIdQuantity = (_id, qt, unit) => ({_id, ...withQuantity(qt, unit)});
export const withNameIdQuantity = (name, _id, qt, unit) => ({name, name_lower: name.toLowerCase(), ...withIdQuantity(_id, qt, unit)});

export const setQuantity = (trunk, qt, unit) => {
    unit = unit ? unit : trunk.quantity.unit;
    trunk.quantity = {qt, unit};
};
export const removeItemQuantity = (item, subItemId) => ({
    ..._.omit(item, "items"),
    items: _.map(item.items, subitem => subitem._id === subItemId ? _.omit(subitem, "quantity") : subitem)
});