import {cols} from "../const/collections";
import {col} from "../repo";

const facetsEntry = () => col(cols.FACET_ENTRY);
const facets = () => col(cols.FACET);

const withId = require('../util/query').withId;
const pullFromFacets = require('../util/query').pullFromFacets;

const get = async name => (await facetsEntry()).findOne({name});

const putall = async (data) => {
    const col = await facetsEntry();
    await col.remove();
    await col.insert(data);
    return col.find().toArray();
};

module.exports = {

    search: async namePart => await facetsEntry()
        .find({name: {$regex: `.*${namePart}.*`}})
        .sort({name: 1})
        .toArray(),

    add: async facet => (await get(facet.name) || {_id: await facetsEntry().insertOne(facet).insertedId, ...facet}),

    purgeFacets: async () => await facetsEntry().deleteMany(),

    deleteFacets: async ({treeId, facetIds}) => await facets().update(withId(treeId), pullFromFacets(facetIds)),

    listall: async () => (await facetsEntry()).find({}).toArray(),

    get,

    putall
};