import {pullFromRoots, pushRoot, withId} from "../util/query";
import {treefy} from "./transforms";
import db from "../repo/db";

const trunks = async () => (await db).collection('Trees');
const headerFields = {qt: 1, unit: 1, name: 1};
const qtField = {quantity: 1, _id: 0};
const searchMixin = {name: 1};

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
const pushFacet = (facet) => ({$push: {facets: facet}});
const setQt = qt => ({$set: {quantity: {qt}}});
const setPrice = price => ({$set: {price}});
const setQuantity = quantity => ({$set: {quantity}});
const setName = name => ({$set: {name, name_lower: name.toLowerCase()}});


const trunkService = {
    getNoMap: getRessourcesGraph,
    all: async () => (await trunks()).find({}).toArray(),
    contains: async _id => !!getHead(_id),
    createOrClone: ({sourceId, name}) => sourceId ? clone(sourceId) : create({name}),
    get: async (_id, qt) => treefy(qt, await getRessourcesGraph(_id)),
    purge: async () => (await trunks()).deleteMany(),
    lookup: async name => (await trunks()).findOne({name}),
    updateName: async ({_id, name}) => (await trunks()).update(withId(_id), setName(name)),
    addFacet: async ({treeId, facet}) => (await trunks()).update(withId(treeId), pushFacet(facet)),
    upsertPrice: async ({treeId, price}) => (await trunks()).update(withId(treeId), setPrice(price)),
    upsertQuantity: async ({treeId, quantity}) => (await trunks()).update(withId(treeId), setQuantity(quantity)),
    remove: async id => (await trunks()).deleteOne(withId(id)),

    putall: async (data) => {
        const col = await trunks();
        await col.remove();
        await col.insert(data);
        return col.find().toArray();
    },

    search: async (grandeur, name) => (await trunks())
        .find({name_lower: {$regex: `^${name.toLowerCase()}.*`}, grandeur: grandeur || undefined}, searchMixin)
        .sort({name_lower: 1})
        .toArray(),


    removeAddRoot : async (root) => {
        await trunkService.removeRoot(root);
        return await trunkService.addRoot(root);
    },
    removeRoot: async ({trunkId, rootId}) => (await trunks()).update(withId(trunkId), pullFromRoots(rootId)),
    addRoot : async ({trunkId, rootId, qt, unit}) => (await trunks()).update(withId(trunkId), pushRoot(rootId, qt, unit)),

    upsertRoot : async ({trunk, root}) => trunkService.removeAddRoot({
        trunkId: trunk._id,
        rootId: root._id,
        ...await adaptQtUnit(trunk, root)
    })


};




const adaptQtUnit = async (trunk, root) => {

    console.log("adaptQt trunk", trunk);
    console.log("adaptQt root", root);

    let trunkQt = await quantity(trunk._id);
    if (!trunkQt) {

        console.log("no trunkQt in base, setting it to", trunk.quantity.qt);

        trunkQt = trunk.quantity.qt;

        await upsertQt(trunk._id, trunkQt);
    } else {
        console.log("trunkQt found in db: ", trunkQt);
    }

    let rootQt = root.quantity.qt * (trunkQt / trunk.quantity.qt);

    console.log(`root qt formula => ${root.quantity.qt} * (${trunkQt} / ${trunk.quantity.qt}) = ${rootQt}`);

    return {qt: rootQt, unit: root.quantity.unit};
};
const upsertQt = async (trunkId, qt) => (await trunks()).update(withId(trunkId), setQt(qt), unstrict);

const getRessourcesGraph = async _id => await (await trunks()).aggregate([matchId(_id), graphLookup]).next() || trunkNotFound(_id);

const clone = async sourceId => create(anonymize(await simpleGet(sourceId)));
const create = async trunk => getHead((await (await trunks()).insertOne({
    ...trunk,
    name_lower: trunk.name.toLowerCase()
})).ops[0]._id);
const anonymize = tree => {
    delete tree._id;
    tree.name = `${tree.name}_copy`;
    return tree;
};

const simpleGet = async _id => (await trunks()).findOne(withId(_id));


const trunkNotFound = _id => {
    throw new Error(`trunk not found: ${_id}`)
};
const quantity = async (id) => (await ((await trunks()).findOne(withId(id), qtField))).quantity.qt;
const getHead = async (id) => (await trunks()).findOne(withId(id), headerFields);


module.exports = trunkService;