import {peekTrunk} from "../service/trunk/getTrunkService";
import {readRoot} from "../service/root/getRootService";
import _ from 'lodash';
import {applyQuantity} from "../util/calculations";
import {erreurDifferenteGrandeurs, GrandeurMismatchError} from "../exceptions/Errors";
import {checkGrandeur} from "../service/grandeur/grandeursService";
import {debug} from "../../test/scenario/integ/testIntegPlumbing";

export const loadNamedUnquantifiedRoot = _id =>
    loadNamedRoots(_id)
        .then(removeQuantity);

export const loadNamedQuantifiedRoot = async (qt, unit, _id) => {

    throw {status:400};
    //
    // return loadNamedRoots(_id)
    //     .then(roots => validateGrandeur({qt, unit}, roots))
    //     .then(roots => applyQuantity({qt, unit}, roots));
};

const loadRoots = _id =>
    readRoot(_id)
        .then(roots => roots || {_id});

const loadNamedRoots = _id =>
    loadRoots(_id)
        .then(populateRootNames);

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

const validateGrandeur = (quantity, roots) => {

    debug("validateGrandeur", quantity, roots);

    const leftUnit = quantity.unit;
    const rightUnit = roots.quantity && roots.quantity.unit;

    if(checkGrandeur(leftUnit, rightUnit)){
        return roots;
    } else {
        erreurDifferenteGrandeurs(leftUnit, rightUnit);
    }
};