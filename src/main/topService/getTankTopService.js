import {readRootTree} from "../service/root/rootQueries";
import {appendTrunkInfos} from "../service/trunk/getTrunkService";
import {summify, tankfy} from "../util/calculations";

export const getTank = (qt, unit, _id) =>
    readRootTree(qt, unit, _id)
        .then(async tree => {
            tree.items = await appendTrunkInfos(summify(tankfy(tree.items)));
            return tree;
        });

