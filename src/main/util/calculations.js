import _ from 'lodash'
import {qtUnitCoef} from "../service/grandeur/grandeursService";
import {debug} from "../../test/scenario/integ/testIntegPlumbing";

export const applyQuantity = (quantity, roots) => {

    debug("applyQuantity", quantity, roots);

    const coef = qtUnitCoef(quantity, roots.quantity);
    roots.quantity = quantity;

    coef ?
        _.forEach(roots.items, item => item.quantity.qt *= coef)
        :
        _.forEach(roots.items, item => _.omit(item, "quantity"))
    ;

    return roots;
};