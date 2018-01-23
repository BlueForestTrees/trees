import _ from 'lodash';
import mongo from 'mongodb';


export const object = id => new mongo.ObjectID(id);
export const objects = ids => _.map(ids, object);

export const withId = id => ({_id: object(id)});
export const withIdIn = ids => ({_id: {$in: objects(ids)}});
export const withQtUnit = (qt, unit) => (qt ? {qt, unit} : {});

export const pullFromFacets = facetIds => ({$pull: {facets: withIdIn(facetIds)}});
export const pullFromRoots = id => ({$pull: {ressources: withId(id)}});
export const pushRoot = (id, qt, unit) => ({$push: {ressources: {...withId(id), ...withQtUnit(qt, unit)}}});