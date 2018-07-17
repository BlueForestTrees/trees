import _, {cloneDeep, find, forEach, groupBy, isNil, map, omit, some} from 'lodash'
import {qtUnitCoef, sameGrandeur, toBaseQuantity} from "trees-units";
import {GrandeurMismatchError} from "../exceptions/Errors";
import Fraction from "fraction.js";

export const listify = tree => {
    const browser = [tree];
    let i = 0;
    for (i; i < browser.length; i++) {
        const item = browser[i];
        if (item.items) {
            browser.push(...item.items);
        }
    }
    return browser;
};


export const erreurSiUnitIncompatibles = (quantity, roots) => {
    const leftUnit = quantity.unit;
    const rightUnit = roots.quantity && roots.quantity.unit;
    const same = sameGrandeur(leftUnit, rightUnit);

    if (leftUnit && rightUnit && !same) {
        throw new GrandeurMismatchError(leftUnit, rightUnit);
    }

    return roots;
};


export const applyQuantity = (quantity, target) => {
    const coef = qtUnitCoef(quantity, target.quantity);

    target.items = coef ?
        map(target.items, item => item.quantity ? (item.quantity.qt = Fraction(item.quantity.qt).mul(coef).valueOf()) && item : omit(item, "quantity"))
        :
        map(target.items, item => omit(item, "quantity"));


    target.quantity = quantity;

    return target;
};

export const flatten = arr =>
    arr.reduce((flat, toFlatten) =>
        flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);

export const quantified = items => some(items, item => !isNil(item.quantity));

export const summify = items =>
    _(items)
        .groupBy("_id")
        .map(sum)
        .value();

export const sum = toSumItems =>
    _(toSumItems)
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

//CLONE

export const treefy = (quantity, graph) => {

    const cache = graph.cache;
    const tree = omit(graph, "cache");

    applyQuantity(quantity, tree);

    tree.items = loadFromCache(tree, cache);

    return tree;
};

const loadFromCache = (tree, cache) => {
    const items = [];
    forEach(tree.items, item => {
        item.items = [];
        let foundInCache = find(cache, {_id: item._id});
        if (foundInCache) {
            const cachedItem = cloneDeep(foundInCache);
            applyQuantity(item.quantity, cachedItem);
            cachedItem.items = loadFromCache(cachedItem, cache);
            items.push(cachedItem);
        } else {
            items.push(omit(item, "items"));
        }
    });
    return items;
};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};