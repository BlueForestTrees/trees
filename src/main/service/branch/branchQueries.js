import {cols} from "../../const/collections";
import {col} from "../../db";
import {matchId, withId, withIdQtUnit} from "../../util/query";
import {treefy} from "../../util/calculations";

const branches = () => col(cols.BRANCH);

const branchGraphLookup = {
    $graphLookup: {
        from: cols.BRANCH,
        startWith: `$items._id`,
        connectFromField: "items._id",
        connectToField: "_id",
        maxDepth: 10,
        as: "cache"
    }
};

export const readBranch = _id => branches().findOne(withId(_id));

export const readBranchTree = (qt, unit, _id) =>
    getBranchGraph(_id)
        .then(graph => graph && treefy({qt, unit}, graph))
        .then(tree => tree || {...withIdQtUnit(_id, qt, unit), items: []});

const getBranchGraph = _id => {
    return branches().aggregate([matchId(_id), branchGraphLookup]).next();
};


