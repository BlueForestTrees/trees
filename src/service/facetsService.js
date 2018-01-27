import {cols} from "../const/collections";

const db = require('../repo/index');
const trees = () => db(cols.TRUNK);
const facets = () => db(cols.FACET_ENTRY);
const withId = require('../util/query').withId;
const pullFromFacets = require('../util/query').pullFromFacets;

const get = async name => (await facets()).findOne({name});

const deleteFacets = async ({treeId, facetIds}) => await trees().update(withId(treeId), pullFromFacets(facetIds));

const putall = async (data) => {
    const col = await facets();
    await col.remove();
    await col.insert(data);
    return col.find().toArray();
};

module.exports = {

    search: async namePart => await facets()
        .find({name: {$regex: `.*${namePart}.*`}})
        .sort({name: 1})
        .toArray(),

    add: async facet => (await get(facet.name) || {_id: await facets().insertOne(facet).insertedId, ...facet}),

    purgeFacets: async () => await facets().deleteMany(),

    deleteFacets,

    listall: async () => (await facets()).find({}).toArray(),

    get,

    putall
};