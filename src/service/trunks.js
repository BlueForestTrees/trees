const db = require('../repo/db');
const mongo = require('mongodb');
const units = require('./units');
const headers = require('./headers');

let trunks = {};

const withId = (value) => {
    return {"_id": new mongo.ObjectID(value)};
};

const addToRoots = (value) => {
    return {$push: {roots: value}};
};
const pullFromRoots = (value) => {
    return {$pull: {roots: {rootId: value}}};
};

const col = async () => {
    return (await db).collection('Trees');
};

const applyQtCoef = (trunks, coef) => {
    if (trunks) {
        trunks.forEach((trunk) => {
            trunk.qt /= coef;
            applyQtCoef(trunk.roots, coef);
        });
    }
};

const get = async (id) => {
    return (await col()).findOne(withId(id));
};

trunks.create = async (trunk) => {
    return headers.get((await (await col()).insertOne(trunk)).ops[0]._id);
};

trunks.load = async ({id, qt, unit}) => {
    const trunk = await get(id);
    const qtInReferenceUnit = units.toReference(qt, unit);
    const trunkQtReferenceUnit = units.toReference(trunk.qt, trunk.unit);
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

trunks.addRoot = async ({trunkId, rootId, trunkQt, rootQt, unit}) => {
    return (await col()).update(
        withId(trunkId),
        addToRoots({
            rootId: rootId//,
            // qt: rootQt * ((await trunks.get(trunkId)).qt / trunkQt),
            // unit: unit
        })
    );
};

trunks.removeRoot = async ({trunkId, rootId}) => {
    return (await col()).update(
        withId(trunkId),
        pullFromRoots(rootId)
    );
};

trunks.search = async (grandeur, name) => {
    return (await col())
        .find({name: {$regex: ".*" + name + ".*"}, grandeur: grandeur || undefined})
        .sort({name: 1})
        .toArray();
};

trunks.purge = async () => {
    return (await col()).deleteMany();
};

module.exports = trunks;