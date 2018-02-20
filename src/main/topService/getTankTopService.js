import {readRootTree} from "../service/root/rootQueries";
import _ from 'lodash';
import {toBaseQuantity} from "../service/grandeur/grandeursService";
import {appendNames} from "../service/trunk/getTrunkService";

export const getTank = (qt, unit, _id) =>
    readRootTree(qt, unit, _id)
        .then(async tree => {
            tree.items = tankfy(tree.items);
            tree.items = summify(tree.items);
            tree.items = await appendNames(tree.items);
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

export const quantified = items => _.some(items, item => !_.isNil(item.quantity));

export const summify = items => _(items)
    .groupBy("_id")
    .map(sum)
    .value();

export const sum = toSumItems => _(toSumItems)
    .map(basifyQuantity)
    .reduce(mergeItems);

export const basifyQuantity = toBasifyItem => {
    toBasifyItem.quantity && (toBasifyItem.quantity = toBaseQuantity(toBasifyItem.quantity));
    return toBasifyItem;
};

export const mergeItems = (left, right) => {
    return left.quantity && right.quantity ?
        (left.quantity.qt += right.quantity.qt) && left
        :
        left.quantity ? left : right;
};