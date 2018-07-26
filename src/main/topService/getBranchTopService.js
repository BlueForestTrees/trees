import {appendTrunkInfos} from "../service/trunk/getTrunkService";
import {readBranch} from "../service/branch/branchQueries";
import _ from 'lodash';
import {applyQuantity, erreurSiUnitIncompatibles} from "../util/calculations";
import {removeQuantity} from "trees-query";

export const loadNamedUnquantifiedBranch = _id =>
    loadNamedBranchs(_id)
        .then(removeQuantity);

export const loadNamedQuantifiedBranch = async (qt, unit, _id) =>
    loadBranchs(_id)
        .then(branchs => erreurSiUnitIncompatibles({qt, unit}, branchs))
        .then(branchs => applyQuantity({qt, unit}, branchs))
        .then(namiFy);

const loadBranchs = _id =>
    readBranch(_id)
        .then(branchs => branchs || {_id});

const loadNamedBranchs = _id =>
    loadBranchs(_id)
        .then(namiFy);

const namiFy = async item => ({
    ..._.omit(item, "items"),
    items: await appendTrunkInfos(item.items)
});




