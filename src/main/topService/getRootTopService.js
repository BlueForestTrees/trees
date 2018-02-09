import {peekTrunk} from "../service/trunk/getTrunkService";
import {readRoot} from "../service/root/getRootService";
import _ from 'lodash';
import {applyQuantity, erreurSiUnitIncompatibles} from "../util/calculations";
import {erreurDifferenteGrandeurs, GrandeurMismatchError} from "../exceptions/Errors";
import {sameGrandeur} from "../service/grandeur/grandeursService";
import {debug} from "../../test/scenario/integ/testIntegPlumbing";

export const loadNamedUnquantifiedRoot = _id =>
    loadNamedRoots(_id)
        .then(removeQuantity);

export const loadNamedQuantifiedRoot = async (qt, unit, _id) => {
    return loadRoots(_id)
        .then(roots => erreurSiUnitIncompatibles({qt, unit}, roots))
        .then(roots => applyQuantity({qt, unit}, roots))
        .then(populateRootNames);
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
            .then(t => ({...item, name: (t && t.name) || "inconnu"}))
        ))
});

const removeQuantity = roots => {
    delete roots.quantity;
    _.forEach(roots.items, item => delete item.quantity);
    return roots;
};

