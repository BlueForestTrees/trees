import _ from 'lodash';


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