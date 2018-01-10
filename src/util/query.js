const _ = require('lodash');
const mongo = require('mongodb');

const object = id => new mongo.ObjectID(id);

const objects = ids => _.map(ids, withId);

const withId = id => ({_id: object(id)});

const withInIds = ids => ({$in: objects(ids)});

const pullFromRoots = (id) => ({$pull: {ressources: withId(id)}});

const pullFromFacets = (facetIds) => {

    console.log(JSON.stringify({$pull: {facets: withInIds(facetIds)}}));

    return ({$pull: {facets: withInIds(facetIds)}})
};

module.exports = {
    withId, pullFromFacets, pullFromRoots
};