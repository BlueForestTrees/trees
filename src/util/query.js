const _ = require('lodash');
const mongo = require('mongodb');

const object = id => new mongo.ObjectID(id);

const withId = id => ({_id: object(id)});

const objects = ids => _.map(ids, object);

const withIdIn = ids => ({_id:{$in: objects(ids)}});

const pullFromRoots = (id) => ({$pull: {ressources: withId(id)}});

const pullFromFacets = (facetIds) => ({$pull: {facets: withIdIn(facetIds)}});

module.exports = {
    withId, pullFromFacets, pullFromRoots
};