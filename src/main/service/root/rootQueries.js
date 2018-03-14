import {cols} from "../../const/collections";
import {col} from "../../db";
import {matchId, withId, withIdQtUnit} from "trees-query";
import {treefy} from "../../util/calculations";

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
        .then(graph => graph && treefy({qt, unit}, graph))
        .then(tree => tree || {...withIdQtUnit(_id, qt, unit), items: []});

const getRootGraph = _id => {
    return roots().aggregate([matchId(_id), rootGraphLookup]).next();
};


