import {peekTrunk} from "../service/trunk/getTrunkService";
import {readRoot} from "../service/root/getRootService";
import _ from 'lodash';
import {qtUnitCoef} from "../service/grandeursService";
import {applyCoef} from "../util/calculations";
import {withQuantity} from "../util/query";

export const loadUnquantifiedRoot = async _id => {
    const roots = await loadRoots(_id);
    delete roots.quantity;
    _.forEach(roots.items, item => delete item.quantity);
    return roots;
};

export const loadQuantifiedRoot = async (qt, unit, _id) => {
    const roots = await loadRoots(_id);

    if(qt && unit && roots.quantity && roots.quantity.qt && roots.quantity.unit){
        const leftQtUnit = {qt,unit};
        const rightQtUnit = {qt:roots.quantity.qt, unit:roots.quantity.unit};
        const coef = qtUnitCoef(leftQtUnit, rightQtUnit);
        applyCoef(roots.items, coef);
    }
    roots.quantity = {qt, unit};

    return roots;
};

const loadRoots = async _id => {
    const root = await readRoot(_id);
    if (root) {
        const itemsWithNames = await populateRoots(root);
        return {
            ..._.omit(root, "items"),
            items: itemsWithNames
        };
    } else {
        return {_id, items: []};
    }
};


const populateRoots = roots => roots ? Promise.all(
    _.map(roots.items, root =>
        peekTrunk(root._id)
            .then(t => ({...root, name: t.name}))
    )) : [];
