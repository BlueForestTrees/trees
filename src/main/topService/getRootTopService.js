import {appendTrunkNames} from "../service/trunk/getTrunkService";
import {readRoot} from "../service/root/rootQueries";
import _ from 'lodash';
import {applyQuantity, erreurSiUnitIncompatibles} from "../util/calculations";
import {removeQuantity} from "trees-query";

export const loadNamedUnquantifiedRoot = _id =>
    loadNamedRoots(_id)
        .then(removeQuantity);

export const loadNamedQuantifiedRoot = async (qt, unit, _id) =>
    loadRoots(_id)
        .then(roots => erreurSiUnitIncompatibles({qt, unit}, roots))
        .then(roots => applyQuantity({qt, unit}, roots))
        .then(namiFy);

const loadRoots = _id =>
    readRoot(_id)
        .then(roots => roots || {_id});

const loadNamedRoots = _id =>
    loadRoots(_id)
        .then(namiFy);

const namiFy = async item => ({
    ..._.omit(item, "items"),
    items: await appendTrunkNames(item.items)
});




