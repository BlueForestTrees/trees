import _ from 'lodash'
import {qtUnitCoef, sameGrandeur} from "../service/grandeur/grandeursService";
import {debug} from "../../test/scenario/integ/testIntegPlumbing";
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

    coef ?
        _.forEach(roots.items, item => item.quantity.qt *= coef)
        :
        _.forEach(roots.items, item => _.omit(item, "quantity"))
    ;

    return roots;
};
