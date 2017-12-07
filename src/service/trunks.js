const db = require('../repo/db');
const mongo = require('mongodb');
const units = require('./units');

let trunks = {};

const withId = (value) => {
    return {"_id": new mongo.ObjectID(value)};
};

const addToRoots = (value) => {
    return {$push: {roots: value}};
};

const col = async () => {
    return (await db).collection('Trees');
};

const get = async (id) => {
    return (await col()).findOne(withId(id));
};

const applyQtCoef = (trunks, coef) => {
    if (trunks) {
        trunks.forEach((trunk) => {
            trunk.qt /= coef;
            applyQtCoef(trunk.roots, coef);
        });
    }
};

trunks.create = async (trunk) => {
    return (await (await col()).insertOne(trunk)).ops[0];
};

trunks.getWithQtUnit = async (id, qt, unit) => {
    const trunk = await get(id);
    const qtInReferenceUnit = units.toReference(qt, unit);
    const trunkQtReferenceUnit = units.toReference(trunk.qt,trunk.unit);
    const coef = trunkQtReferenceUnit / qtInReferenceUnit;

    trunk.qt = qt;
    trunk.unit = unit;
    applyQtCoef(trunk.roots, coef);

    return trunk;
};

trunks.get = trunks.contains = (id) => {
    return get(id);
};

trunks.remove = async (id) => {
    return (await col()).deleteOne(withId(id));
};

trunks.addRoot = async (trunk, root) => {
    return (await col()).update(withId(trunk._id), addToRoots(root));
};

trunks.removeRoot = async (trunkId, rootId) => {
    return (await col()).update(withId(trunkId), {$pull: {roots: {rootId: rootId}}});
};


trunks.search = async (value) => {
    return (await col()).find({name: {$regex: ".*" + value + ".*"}}).toArray();
};

trunks.purge = async () => {
    return (await col()).deleteMany();
};

module.exports = trunks;