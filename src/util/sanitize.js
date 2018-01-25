const mongo = require('mongodb');
const object = id => new mongo.ObjectID(id);
const _ = require('lodash');

export const objId = (data) => {
    _.forEach(data, trunk => {
        trunk._id = object(trunk._id);
        if(trunk.ressources) {
            _.forEach(trunk.ressources, root => {
                root._id = object(root._id);
            })
        }
        if(trunk.facets) {
            _.forEach(trunk.facets, root => {
                root._id = object(root._id);
            })
        }
    });
    return data;
};