import {pullFromRoots, pushRoot, withId} from "../util/query";
import {treefy} from "./transforms";
import db from "../repo/db";
import {qtUnitCoef} from "./grandeurs";
import {GrandeurMismatchError, TrunkUnitInvalidError} from "../exceptions/Errors";

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
const setPrice = price => ({$set: {price}});
const setQuantity = quantity => ({$set: {quantity}});
const setName = name => ({$set: {name, name_lower: name.toLowerCase()}});


const trunkService = {
    getNoMap: getRessourcesGraph,
    all: async () => (await trunks()).find({}).toArray(),
    contains: async _id => getHead(_id),
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



export const getQuantity = async (id) => (await ((await trunks()).findOne(withId(id), qtField))).quantity;
export const upsertQuantity = async (trunkId, quantity) => (await trunks()).update(withId(trunkId), ({$set: {quantity}}), unstrict);

export const getSertQuantity = async trunk => {
    const qt = await getQuantity(trunk._id);
    if(qt) {
        console.log("qt found", qt);
        return qt;
    }else{
        console.log("qt inserted", trunk.quantity);
        await upsertQuantity(trunk._id, trunk.quantity);
        return trunk.quantity;
    }
};

const adaptQtUnit = async (trunk, root) => {

    let dbTrunkQt = await getSertQuantity(trunk);
    let trunkCoef = 0;

    try{
        trunkCoef = qtUnitCoef(dbTrunkQt, trunk.quantity);
    }catch(e){
        if(e instanceof GrandeurMismatchError){
            throw new TrunkUnitInvalidError(`unité de trunk incompatible`,e);
        }
    }

    return {qt: trunkCoef * root.quantity.qt, unit: root.quantity.unit};
};

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
const getHead = async (id) => (await trunks()).findOne(withId(id), headerFields);


module.exports = trunkService;