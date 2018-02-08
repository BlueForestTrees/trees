import {peekTrunk} from "../service/trunk/getTrunkService";
import {readRoot} from "../service/root/getRootService";
import _ from 'lodash';
import {applyCoef} from "../util/calculations";
import {GrandeurMismatchError} from "../exceptions/Errors";
import {qtUnitCoef} from "../service/grandeur/grandeursService";

export const loadNamedUnquantifiedRoot = _id =>
    loadNamedRoots(_id)
        .then(removeQuantity);

export const loadNamedQuantifiedRoot = async (qt, unit, _id) =>
    loadNamedRoots(_id)
        .then(roots => applyQt(qt, unit, roots));

const loadRoots = _id =>
    readRoot(_id)
        .then(roots => roots || {_id});

const loadNamedRoots = _id =>
    loadRoots(_id)
        .then(populateRootNames);

const applyQt = (qt, unit, roots) => {
    if (qt && roots.quantity && roots.quantity.qt) {
        const leftQtUnit = {qt, unit};
        const rightQtUnit = {qt: roots.quantity.qt, unit: roots.quantity.unit};
        let coef;
        try {
            coef = qtUnitCoef(leftQtUnit, rightQtUnit);
        } catch (e) {
            if (e instanceof GrandeurMismatchError) {
                e.status = 400;
            }
            throw e;
        }
        applyCoef(roots.items, coef);
    }
    roots.quantity = {qt, unit};
    return roots;
};

const populateRootNames = async roots => ({
    ..._.omit(roots, "items"),
    items: await Promise.all(
        _.map(roots.items, item => peekTrunk(item._id)
            .then(t => ({...item, name: t.name}))
        ))
});

const removeQuantity = roots => {
    delete roots.quantity;
    _.forEach(roots.items, item => delete item.quantity);
    return roots;
};