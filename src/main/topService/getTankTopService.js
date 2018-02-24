import {readRootTree} from "../service/root/rootQueries";
import _ from 'lodash';
import {appendTrunkNames} from "../service/trunk/getTrunkService";
import {quantified, summify} from "../util/calculations";

export const getTank = (qt, unit, _id) =>
    readRootTree(qt, unit, _id)
        .then(async tree => {
            tree.items = await appendTrunkNames(summify(tankfy(tree.items)));
            return tree;
        });

export const tankfy = items => {
    const tank = [];
    const browser = items.slice();
    let i = 0;
    for (i; i < browser.length; i++) {
        const item = browser[i];
        if (item.quantity && item.items && quantified(item.items)) {
            browser.push(...item.items);
        } else {
            tank.push(_.omit(item, "items"));
        }
    }
    return tank;
};