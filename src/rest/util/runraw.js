const mongo = require('mongodb');
const object = id => new mongo.ObjectID(id);
const _ = require('lodash');

const objId = (data) => {
    _.forEach(data, trunk => {
        trunk._id = object(trunk._id);
        if(trunk.ressources) {
            _.forEach(trunk.ressources, root => {
                root._id = object(root._id);
            })
        }
    });
    return data;
};

module.exports = function runraw(work) {
    let validResultJson = async (req, res, next) => {
        res.json(await work(objId(req.body), res, next));
    };

    return (req, res, next) => {
        Promise
            .resolve(validResultJson(req, res, next))
            .catch(next);
    };
};
