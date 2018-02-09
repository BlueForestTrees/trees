import {cols} from "../../const/collections";
import {col} from "../../repo";
import {matchId, withId} from "../../util/query";
import _ from 'lodash';
import {applyQuantity} from "../../util/calculations";

const roots = () => col(cols.ROOT);

const rootGraphLookup = {
    $graphLookup: {
        from: cols.ROOT,
        startWith: `$items._id`,
        connectFromField: "items._id",
        connectToField: "_id",
        maxDepth: 10,
        as: "cache"
    }
};

export const readRoot = _id => roots().findOne(withId(_id));

export const readRootTree = (qt, unit, _id) =>
    getRootGraph(_id)
        .then(graph => treefy({qt, unit}, graph));

const getRootGraph = _id => roots().aggregate([matchId(_id), rootGraphLookup]).next();

const treefy = (quantity, graph) => {
    const cache = graph.cache;
    const trunk = _.omit(graph, "cache");

    applyQuantity(quantity, trunk);

    // const items = trunk.items;
    //
    // _.forEach(items, item => {
    //     const _id = item._id;
    //     const quantity = item.quantity;
    //     item.items = [];
    //
    //     const cachedItem = _.cloneDeep((_.find(cache, {_id})));
    //   //  applyQuantity(quantity.qt, quantity.unit, cachedItem);
    //
    // });

    return {quantity: {qt, unit}, trunk, cache};
};