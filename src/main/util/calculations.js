import _ from 'lodash'
import {qtUnitCoef, sameGrandeur, toBaseQuantity} from "../service/unit/unitService";
import {GrandeurMismatchError} from "../exceptions/Errors";
import {debug} from "./debug";
import Fraction from "fraction.js";


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

    debug({quantity, target, coef});

    target.items = coef ?
        _.map(target.items, item => item.quantity ? (item.quantity.qt = Fraction(item.quantity.qt).mul(coef).valueOf()) && item : _.omit(item, "quantity"))
        :
        _.map(target.items, item => _.omit(item, "quantity"));


    target.quantity = quantity;

    return target;
};

export const flatten = arr =>
    arr.reduce((flat, toFlatten) =>
        flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);

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

//CLONE
const precisionRound = (number, precision) => {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
};
export const bestRound = v =>
    v < 1 ? precisionRound(v,3)
        :
        v < 10 ? precisionRound(v,2)
            :
            v < 100 ? precisionRound(v,1)
                :
                Math.round(v);