import {removeQuantity} from "trees-query";
import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import {matchId, withId, withIdQtUnit} from "trees-query";
import {applyQuantity, erreurSiUnitIncompatibles, treefy} from "../../util/calculations";

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


export const loadNamedUnquantifiedBranch = _id =>
    loadBranchs(_id)
        .then(removeQuantity);

export const loadNamedQuantifiedBranch = async (qt, unit, _id) =>
    loadBranchs(_id)
        .then(branchs => erreurSiUnitIncompatibles({qt, unit}, branchs))
        .then(branchs => applyQuantity({qt, unit}, branchs))

const loadBranchs = _id =>
    readBranch(_id)
        .then(branchs => branchs || {_id, items: []});

