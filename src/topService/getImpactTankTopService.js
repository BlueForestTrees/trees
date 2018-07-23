import {readRootTree} from "../service/root/rootQueries";
import _ from 'lodash';
import {loadDenseQuantifiedImpacts} from "./getImpactTopService";
import {flatten, listify, summify} from "../util/calculations";
import {peekImpactEntries} from "../service/impactEntry/getImpactEntryService";

export const getImpactTank = async (qt, unit, _id) => {
    const tree = await readRootTree(qt, unit, _id);
    const treeNodes = listify(tree);
    const impacts = await Promise.all(_.map(treeNodes, loadDenseQuantifiedImpacts));
    const tank = {
        _id,
        quantity: {qt, unit},
        items: summify(flatten(impacts))
    };

    await addImpactInfos(tank);

    return tank;
};

const addImpactInfos = async impact => {
    const names = await peekImpactEntries(_.map(impact.items, "_id"));
    _.forEach(names, e => {
        _.find(impact.items, {_id: e._id}).name = e.name;
        _.find(impact.items, {_id: e._id}).color = e.color;
    });
    return impact;
};