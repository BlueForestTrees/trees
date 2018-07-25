import {quantified, summify} from "../util/calculations";
import {omit} from 'lodash';
import {readRootTree} from "../service/root/rootService";

export const getTank = (qt, unit, _id) =>
    readRootTree(qt, unit, _id)
        .then(async tree => {
            tree.items = await summify(tankfy(tree.items));
            return tree;
        });

const tankfy = items => {
    const tank = [];
    const browser = items.slice();
    let i = 0;
    for (i; i < browser.length; i++) {
        const item = browser[i];
        if (item.quantity && item.items && quantified(item.items)) {
            browser.push(...item.items);
        } else {
            tank.push(omit(item, "items"));
        }
    }
    return tank;
};
