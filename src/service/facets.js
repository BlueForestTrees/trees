const mongo = require('mongodb');
const db = require('../repo/db2');
const facets = () => db('Facets');

const get = async name => (await facets()).findOne({name});

module.exports = {

    search: async namePart => await facets()
        .find({name: {$regex: `.*${namePart}.*`}})
        .sort({name: 1})
        .toArray(),

    add: async facet => (await get(facet.name) || {_id: await facets().insertOne(facet).insertedId, ...facet}),

    purge: async () => await facets().deleteMany(),

    listall: async () => (await facets()).find({}).toArray(),

    get
};