const db = require('../repo/db2');
const trees = () => db('Trees');
const facets = () => db('Facets');
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

    purge: async () => await facets().deleteMany(),

    deleteFacets,

    listall: async () => (await facets()).find({}).toArray(),

    get,

    putall
};