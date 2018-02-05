import _ from 'lodash';
import mongo from 'mongodb';

export const upsert = {upsert: true};
export const object = id => new mongo.ObjectID(id);
export const objects = ids => _.map(ids, object);

export const withId = id => ({_id: object(id)});
export const withIdIn = ids => ({_id: {$in: objects(ids)}});
export const withQuantity = quantity => quantity && quantity.qt && quantity.unit ? {quantity: {qt: quantity.qt, unit: quantity.unit}} : {};

export const pullFromFacets = facetIds => ({$pull: {items: withIdIn(facetIds)}});
export const pullFromRoots = id => ({$pull: {items: withId(id)}});
export const pushRoot = (id, quantity) => ({$push: {items: {...withId(id), ...withQuantity(quantity)}}});
export const pushFacet = ({_id, qt, unit}) => ({$push: {items: {_id: object(_id), qt, unit}}});