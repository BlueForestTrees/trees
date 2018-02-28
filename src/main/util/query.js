import _ from 'lodash';
import mongo from 'mongodb';

export const upsert = {upsert: true};
export const object = id => new mongo.ObjectID(id);
export const objects = ids => _.map(ids, object);

export const withId = id => ({_id: object(id)});
export const withIdIn = ids => ({_id: {$in: objects(ids)}});
export const withQuantity = quantity => quantity && quantity.qt && quantity.unit ? {quantity: {qt: quantity.qt, unit: quantity.unit}} : {};
export const withIdQuantity = (id, quantity) => ({...withId(id), ...withQuantity(quantity)});
export const withIdQtUnit = (id, qt, unit) => withIdQuantity(id, {qt, unit});

export const matchId = (_id) => ({$match: withId(_id)});


export const pullItem = itemId => ({$pull: {items: withId(itemId)}});
export const pullItems = itemIds => ({$pull: {items: withIdIn(itemIds)}});

export const pushRoot = (id, quantity) => ({$push: {items: withIdQuantity(id, quantity)}});
export const pushItem = ({_id, quantity}) => ({$push: {items: {_id: object(_id), quantity}}});

export const emptyGroup = _id => ({_id, items: []});


export const removeQuantity = e => {
    delete e.quantity;
    _.forEach(e.items, item => delete item.quantity);
    return e;
};