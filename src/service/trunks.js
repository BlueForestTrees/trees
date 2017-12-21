const db = require('../repo/db');
const mongo = require('mongodb');
const treefy = require('./transforms').treefy;
const headerFields = {qt: 1, unit: 1, name: 1};
const qtField = {qt: 1, _id: 0};
const object = id => new mongo.ObjectID(id);
const withId = id => ({"_id": object(id)});
const withQt = (qt, unit) => {
    return qt ? {qt, unit} : {}
};
const unstrict = {strict: false};
const graphLookup = {
    $graphLookup: {
        from: "Trees",
        startWith: "$childList._id",
        connectFromField: "childList._id",
        connectToField: "_id",
        maxDepth: 10,
        as: "cache"
    }
};
const matchId = (_id) => ({$match: withId(_id)});

const pushRoots = (rootId, qt, unit) => ({$push: {childList: {...withId(rootId), ...withQt(qt, unit)}}});

const pullFromRoots = (id) => ({$pull: {childList: withId(id)}});

const setQt = (qt) => ({$set: {qt: qt}});

const col = async () => (await db).collection('Trees');

const headerGet = async (id) => (await col()).findOne(withId(id), headerFields);

const qt = async (id) => (await ((await col()).findOne(withId(id), qtField))).qt;

const upsertQt = async (trunkId, qt) => (await col()).update(withId(trunkId), setQt(qt), unstrict);

const adaptQt = async (trunk, root) => {
    const trunkQt = await qt(trunk._id);
    if (trunkQt) {
        return root.qt * (trunkQt / trunk.qt)
    } else {
        await upsertQt(trunk._id, trunk.qt);
        return root.qt;
    }
};

const setRootQtUnit = async ({trunk, root}) => {
    await removeRoot({trunkId: trunk._id, rootId: root._id});
    let qt = await adaptQt(trunk, root);
    return addRoot({trunkId: trunk._id, rootId: root._id, qt: qt});
};
const addRoot = async ({trunkId, rootId, qt, unit}) => (await col()).update(withId(trunkId), pushRoots(rootId, qt, unit));
const removeRoot = async ({trunkId, rootId}) => (await col()).update(withId(trunkId), pullFromRoots(rootId));
const getNoMap = async (_id) => await (await col()).aggregate([matchId(_id), graphLookup]).next();
const get = async (_id) => treefy(await getNoMap(_id));

module.exports = {
    addRoot,
    setRootQtUnit,
    all: async () => (await db).collection('Trees').find({}).toArray(),
    get: get,
    getNoMap: getNoMap,
    contains: headerGet,
    create: async (trunk) => headerGet((await (await col()).insertOne(trunk)).ops[0]._id),
    remove: async (id) => (await col()).deleteOne(withId(id)),
    removeRoot,
    search: async (grandeur, name) => (await col())
        .find({name: {$regex: `.*${name}.*`}, grandeur: grandeur || undefined})
        .sort({name: 1})
        .toArray(),
    purge: async () => (await col()).deleteMany(),
};