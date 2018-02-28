import {cols} from "../../const/collections";
import {col} from "../../repo";
import {GrandeurMismatchError, UnitInvalidError} from "../../exceptions/Errors";
import {pullItem, pushItem, quantityField, upsert, withId} from "../../util/query";
import {qtUnitCoef} from "../unit/unitService";

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


export const insertBranch = ({trunk, branch}) => addBranch(trunk._id, branch._id);

export const removeBranch = ({trunkId, branchId}) => branches().update(withId(trunkId), pullItem(branchId));

export const upsertBranch = async ({trunk, branch}) => removeAddBranch({
    trunkId: trunk._id,
    branchId: branch._id,
    quantity: await adaptQtUnit(trunk, branch)
});

const removeAddBranch = async ({trunkId,branchId,quantity}) => {
    await removeBranch({trunkId,branchId});
    return await addBranch(trunkId, branchId, quantity);
};

const addBranch = async (trunkId, branchId, quantity) => branches().update(withId(trunkId), pushItem({_id:branchId, quantity}), upsert);
