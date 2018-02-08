import {cols} from "../../const/collections";
import {col} from "../../repo";
import {matchId, withId} from "../../util/query";

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
        .then(graph => treefy(qt, unit, graph));

const getRootGraph = _id => roots().aggregate([matchId(_id), rootGraphLookup]).next();

const treefy = (qt, unit, graph) => {

    return graph;
};