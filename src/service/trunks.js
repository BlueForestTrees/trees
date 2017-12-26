const mongo = require('mongodb');
const db = require('../repo/db');
const trunks = async () => (await db).collection('Trees');
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
        startWith: "$ressources._id",
        connectFromField: "ressources._id",
        connectToField: "_id",
        maxDepth: 10,
        as: "cache"
    }
};
const matchId = (_id) => ({$match: withId(_id)});

const pushRoots = (rootId, qt, unit) => ({$push: {ressources: {...withId(rootId), ...withQt(qt, unit)}}});

const pullFromRoots = (id) => ({$pull: {ressources: withId(id)}});

const setQt = (qt) => ({$set: {qt: qt}});


const headerGet = async (id) => (await trunks()).findOne(withId(id), headerFields);

const qt = async (id) => (await ((await trunks()).findOne(withId(id), qtField))).qt;

const upsertQt = async (trunkId, qt) => (await trunks()).update(withId(trunkId), setQt(qt), unstrict);

const adaptQt = async ({trunk, root}) => {
    let trunkQt = await qt(trunk._id);
    if (!trunkQt) {
        await upsertQt(trunk._id, trunk.qt);
        trunkQt = trunk.qt;
    }

    return root.qt * (trunkQt / trunk.qt);
};

const updateRoot = async (root) => {
    await removeRoot(root);
    await addRoot(root);
};

const setRootQtUnit = async ({trunk, root}) => updateRoot({trunkId:trunk._id, rootId:root._id, qt:await adaptQt({trunk, root})});

const addRoot = async ({trunkId, rootId, qt, unit}) => (await trunks()).update(withId(trunkId), pushRoots(rootId, qt, unit));
const removeRoot = async ({trunkId, rootId}) => (await trunks()).update(withId(trunkId), pullFromRoots(rootId));
const getNoMap = async (_id) => {
    const t = await (await trunks()).aggregate([matchId(_id), graphLookup]).next();
    if (!t) throw new Error(`trunk not found: ${_id}`);
    return t;
};
const get = async (_id, qt) => treefy(qt, await getNoMap(_id));

const all = async () => (await trunks()).find({}).toArray();

const putall = async (data) => {
    const col = await trunks();
    await col.remove();

    await col.insert(data);
    return col.find().toArray();
};

module.exports = {
    addRoot,
    setRootQtUnit,
    all,
    putall,
    get: get,
    getNoMap: getNoMap,
    contains: headerGet,
    create: async (trunk) => headerGet((await (await trunks()).insertOne(trunk)).ops[0]._id),
    remove: async (id) => (await trunks()).deleteOne(withId(id)),
    removeRoot,
    search: async (grandeur, name) => (await trunks())
        .find({name: {$regex: `.*${name}.*`}, grandeur: grandeur || undefined})
        .sort({name: 1})
        .toArray(),
    purge: async () => (await trunks()).deleteMany(),
};