const db = require('../repo/db2');
const facets = () => db('Facets');
const withId = require('../util/query').withId;
const pullFromFacets = require('../util/query').pullFromFacets;




const get = async name => (await facets()).findOne({name});


const deleteFacets = async ({treeId, facetIds}) => {
    let pullFromFacets2 = pullFromFacets(facetIds);

    return await facets().update(withId(treeId), pullFromFacets2, {multi: true});
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

    get
};