const db = require('../repo/db');
const mongo = require('mongodb');
const headerFields = {qt: 1, unit: 1, name: 1};
const withId = (value) => ({"_id": new mongo.ObjectID(value)});
const graphLookup = {
    $graphLookup: {
        from: "Trees",
        startWith: "$roots._id",
        connectFromField: "roots._id",
        connectToField: "_id",
        maxDepth: 1,
        as: "cache"
    }
};
const matchId = (_id) => ({$match: withId(_id)});

const pushRoots = (rootId, qt, unit) => ({$push: {roots: {...withId(rootId), qt, unit}}});

const pullFromRoots = (id) => ({$pull: {roots: withId(id)}});

const col = async () => (await db).collection('Trees');

const headerGet = async (id) => (await col()).findOne(withId(id), headerFields);

const setRootQtUnit = async ({trunkId, rootId, qt, unit}) => {
    await removeRoot({trunkId, rootId});
    return addRoot({trunkId, rootId, qt, unit});
};
const addRoot = async ({trunkId, rootId, qt, unit}) => (await col()).update(withId(trunkId), pushRoots(rootId, qt, unit));
const removeRoot = async ({trunkId, rootId}) => (await col()).update(withId(trunkId), pullFromRoots(rootId));

module.exports = {
    addRoot,
    setRootQtUnit,

    headersAll: async () => (await db).collection('Trees').find({}, headerFields).toArray(),

    get: async (_id) => (await col()).aggregate([matchId(_id), graphLookup]).next(),

    contains: headerGet,

    create: async (trunk) => headerGet((await (await col()).insertOne(trunk)).ops[0]._id),

    remove: async (id) => (await col()).deleteOne(withId(id)),

    removeRoot,

    search: async (grandeur, name) => (await col())
        .find({name: {$regex:`.*${name}.*`}, grandeur: grandeur || undefined})
        .sort({name: 1})
        .toArray(),

    purge: async () => (await col()).deleteMany(),
};