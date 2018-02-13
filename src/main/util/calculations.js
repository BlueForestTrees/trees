import _ from 'lodash'
import {qtUnitCoef, sameGrandeur} from "../service/grandeur/grandeursService";
import {debug} from "../../test/testIntegPlumbing";
import {GrandeurMismatchError} from "../exceptions/Errors";

/**
 * exception si les quantités sont toutes deux fournies mais incompatibles
 * @param quantity
 * @param roots
 * @returns roots
 */
export const erreurSiUnitIncompatibles = (quantity, roots) => {
    const leftUnit = quantity.unit;
    const rightUnit = roots.quantity && roots.quantity.unit;
    const same = sameGrandeur(leftUnit, rightUnit);

    if (leftUnit && rightUnit && !same) {
        throw new GrandeurMismatchError(leftUnit, rightUnit);
    }

    return roots;
};


export const applyQuantity = (quantity, roots) => {
    const coef = qtUnitCoef(quantity, roots.quantity);
    roots.quantity = quantity;

    roots.items = coef ?
        _.map(roots.items, item => item.quantity ? (item.quantity.qt *= coef) && item : _.omit(item, "quantity"))
        :
        _.map(roots.items, item => _.omit(item, "quantity"));

    return roots;
};
