const db = require('../repo/db');
const mongo = require('mongodb');

let trunks = {};

const id = (value) => {
    return new mongo.ObjectID(value);
};

trunks.get = trunks.contains = async (trunkId) => {
    return (await db).collection('Trees').findOne({"_id": id(trunkId)});
};

trunks.remove = async (trunkId) => {
    return (await db).collection('Trees').deleteOne({"_id": id(trunkId)});
};

trunks.addRoot = async (trunk, root) => {
    return (await db).collection('Trees').update(trunk, {$push: {roots: root}});
};

trunks.removeRoot = async (trunkId, rootId) => {
    return (await db).collection('Trees').update({_id: id(trunkId)}, {$pull: {roots: {rootId: rootId}}});
};


trunks.search = async (value) => {
    return (await db).collection('Trees').find({name:{$regex : "^"+value}}).toArray();
};

module.exports = trunks;