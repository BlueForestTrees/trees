const mongo = require('mongodb');
const object = id => new mongo.ObjectID(id);
const _ = require('lodash');

export const addObjects = data => {
    let isArray = _.isArray(data);
    if(!isArray){
        data = [data];
    }

    _.forEach(data, item => {
        item._id = object(item._id);
        if (item.items) {
            _.forEach(item.items, subitem => {
                subitem._id = object(subitem._id);
            })
        }
        return item;
    });

    return isArray ? data : data[0];
};

export const removeObjects = data => {
    return _.cloneDeepWith(data, val => {
        if (val instanceof mongo.ObjectID) {
            return val.toString();
        } else {
            return undefined;
        }
    });
};