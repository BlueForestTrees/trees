const mongo = require('mongodb');
const object = id => new mongo.ObjectID(id);
const _ = require('lodash');

export const addObjects = (data) => {
    _.forEach(data, trunk => {
        trunk._id = object(trunk._id);
        if (trunk.items) {
            _.forEach(trunk.items, root => {
                root._id = object(root._id);
            })
        }
        return trunk;
    });
    return data;
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