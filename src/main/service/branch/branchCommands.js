import {cols} from "../../const/collections";
import {col} from "../../db";
import {GrandeurMismatchError, UnitInvalidError} from "../../exceptions/Errors";
import {pullItem, pushItem, quantityField, upsert, withId} from "trees-query";
import {qtUnitCoef} from "trees-units";

const branches = () => col(cols.BRANCH);

const adaptQtUnit = async (trunk, branch) => {
    let dbTrunkQt = await getSertQuantity(trunk);
    let trunkCoef = 0;

    try {
        trunkCoef = qtUnitCoef(dbTrunkQt, trunk.quantity);
    } catch (e) {
        if (e instanceof GrandeurMismatchError) {
            throw new UnitInvalidError(`unité incompatible`, e);
        }
    }

    return {qt: trunkCoef * branch.quantity.qt, unit: branch.quantity.unit};
};

const getSertQuantity = async trunk => {
    const trunkQuantity = await readForQuantity(trunk._id)
        .then(branch => branch && branch.quantity || null);

    if (trunkQuantity) {
        return trunkQuantity;
    } else if (trunk.quantity && trunk.quantity.qt && trunk.quantity.unit) {
        await setQuantity({_id: trunk._id, quantity: trunk.quantity});
        return trunk.quantity;
    } else {
        return {};
    }
};

const readForQuantity = async (id) => branches().findOne(withId(id), quantityField);

const setQuantity = ({_id, quantity}) => branches().update(withId(_id), ({$set: {quantity}}), upsert);

export const insertBranch = ({trunk, branch}) =>
    removeBranch({trunkId:trunk._id, branchId:branch._id})
        .then(() => addBranch(trunk._id, branch._id));

export const upsertBranch = async ({trunk, branch}) =>
    removeBranch({trunkId:trunk._id, branchId:branch._id})
        .then(()=>adaptQtUnit(trunk, branch))
        .then(quantity => addBranch(trunk._id, branch._id, quantity));

export const removeBranch = ({trunkId, branchId}) => branches().update(withId(trunkId), pullItem(branchId));
const addBranch = async (trunkId, branchId, quantity) => branches().update(withId(trunkId), pushItem({...withId(branchId), quantity}), upsert);
