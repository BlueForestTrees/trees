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
        .then(graph => graph && treefy({qt, unit}, graph));

const getRootGraph = _id => {
    return roots().aggregate([matchId(_id), rootGraphLookup]).next();
};

const treefy = (quantity, graph) => {
    const cache = graph.cache;
    const tree = _.omit(graph, "cache");

    applyQuantity(quantity, tree);

    tree.items = loadFromCache(tree, cache);

    return tree;
};

const loadFromCache = (tree, cache) => {
    const items = [];
    _.forEach(tree.items, item => {
        item.items = [];
        let foundInCache = _.find(cache, {_id: item._id});
        if (foundInCache) {
            const cachedItem = _.cloneDeep(foundInCache);
            applyQuantity(item.quantity, cachedItem);
            cachedItem.items = loadFromCache(cachedItem, cache);
            items.push(cachedItem);
        } else {
            items.push(_.omit(item, "items"));
        }
    });
    return items;
};


