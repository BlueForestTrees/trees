import {readRootTree} from "../service/root/getRootService";
import _ from 'lodash';
import {toBaseQuantity} from "../service/grandeur/grandeursService";

export const getTank = (qt, unit, _id) =>
    readRootTree(qt, unit, _id)
        .then(tree => {
            tree.items = tankfy(tree.items);
            tree.items = summify(tree.items);
            return tree;
        });

export const tankfy = items => {
    const tank = [];
    const browser = items.slice();
    let i = 0;
    for (i; i < browser.length; i++) {
        const item = browser[i];
        if (item.items) {
            browser.push(...item.items);
        } else {
            tank.push(item);
        }
    }
    return tank;
};

export const summify = items => _(items)
    .groupBy("_id")
    .map(sum)
    .value();

export const sum = toSumItems => _(toSumItems)
    .map(basifyQuantity)
    .reduce(sumQt);

export const basifyQuantity = toBasifyItem => {
    toBasifyItem.quantity = toBaseQuantity(toBasifyItem.quantity);
    return toBasifyItem;
};

export const sumQt = (left, right) => {
    left.quantity.qt += right.quantity.qt;
    return left;
};