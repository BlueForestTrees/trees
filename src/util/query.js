import _ from 'lodash';
import mongo from 'mongodb';


export const object = id => new mongo.ObjectID(id);
export const objects = ids => _.map(ids, object);

export const withId = id => ({_id: object(id)});
export const withIdIn = ids => ({_id: {$in: objects(ids)}});
export const withRootId = id => ({"ressources._id": object(id)});

export const pullFromFacets = facetIds => ({$pull: {facets: withIdIn(facetIds)}});
export const pullFromRoots = id => ({$pull: {ressources: withId(id)}});
