import _ from 'lodash';

const grandeurOf = unit => {
    switch (unit) {
        case 'kg':
        case 't':
        case 'g':
            return {grandeur: 'Mass'};
        case 'm2':
            return {grandeur: 'Surf'};
        case 'count':
            return {grandeur: 'Nomb'};
        case 'L':
        case 'm3':
            return {grandeur: 'Volu'};
        default:
            return {};
    }
};

export const clon = obj => _.cloneDeep(obj);
export const remove = (obj, prop, criteria) => {
    const clone = clon(obj);
    clone[prop] = _.without(clone[prop], _.find(clone[prop], criteria));
    return clone;
};
export const debug = (...obj) => {
    try {
        console.log(JSON.stringify(obj, null, 4));
    } catch (e) {
        console.log(obj);
    }
    return Promise.resolve(...obj);
};
export const setQuantity = (trunk, qt, unit) => {
    unit = unit ? unit : trunk.quantity.unit;
    trunk.quantity = {qt, unit};
};
export const removeItemQuantity = (item, subItemId) => ({
    ..._.omit(item, "items"),
    items: _.map(item.items, subitem => subitem._id === subItemId ? _.omit(subitem, "quantity") : subitem)
});
export const replaceItem = (obj, prop, value) => {
    const result = remove(obj, prop, {_id: value._id});
    result[prop].push(value);
    return result;
};
export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const withQtCoef = (items, coef) => _.forEach(items, root => root.quantity.qt *= coef || 2);
export const withoutQuantity = items => _.map(items, item => _.omit(item, "quantity"));
export const withIdQuantity = (_id, qt, unit) => ({_id, ...withQuantity(qt, unit)});
export const withId = _id => ({_id});
export const withIdQtUnit = (_id, qt, unit) => ({_id, qt, unit});
export const withQuantity = (qt, unit) => ({quantity: {qt, unit}});
export const withTrunk = (name, _id, qt, unit) => ({color: getRandomColor(), name, name_lower: name.toLowerCase(), ...withIdQuantity(_id, qt, unit), ...grandeurOf(unit)});
export const withTrunkNoQt = (name, _id, unit) => ({_id, color: getRandomColor(), name, name_lower: name.toLowerCase(), ...grandeurOf(unit)});
export const withEntry = (_id, name, grandeur) => ({_id, color: getRandomColor(), name, grandeur, name_lower: name.toLowerCase()});
export const withValidationError = (prop, location, msg, value) => ({[prop]: {location, msg, param: prop, value}});