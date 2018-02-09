import {readRootTree} from "../service/root/getRootService";
import _ from 'lodash';
import {toBaseQuantity} from "../service/grandeur/grandeursService";

export const getTank = (qt, unit, _id) =>
    readRootTree(qt, unit, _id)
        .then(tankfy)
        .then(summify);

const tankfy = tree => {
    const tank = [];

    let i = 0;
    for (i; i < tree.items.length; i++) {
        const item = tree.items[i];
        if (item.items) {
            tree.items.push(...item.items);
        } else {
            tank.push(item);
        }
    }

    tree.items = tank;

    return tree;
};

const summify = tree => {
    tree.items = _(tree.items)
        .groupBy("_id")
        .map(sum)
        .value();
    return tree;
};

const sum = toSumItems => _(toSumItems)
    .map(toSumItem => {
        toSumItem.quantity = toBaseQuantity(toSumItem.quantity);
        return toSumItem;
    })
    .reduce((left, right) => {
        left.quantity.qt += right.quantity.qt;
        return left;
    });