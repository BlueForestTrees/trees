import {cols} from "../../const/collections";
import {col} from "../../repo";
import {GrandeurMismatchError, UnitInvalidError} from "../../exceptions/Errors";
import {pullFromRoots, pushRoot, upsert, withId} from "../../util/query";
import {qtUnitCoef} from "../unit/unitService";

const roots = () => col(cols.ROOT);

const quantityField = {quantity:1};


const adaptQtUnit = async (trunk, root) => {
    let dbTrunkQt = await getSertQuantity(trunk);
    let trunkCoef = 0;

    try {
        trunkCoef = qtUnitCoef(dbTrunkQt, trunk.quantity);
    } catch (e) {
        if (e instanceof GrandeurMismatchError) {
            throw new UnitInvalidError(`unité incompatible`, e);
        }
    }

    return {qt: trunkCoef * root.quantity.qt, unit: root.quantity.unit};
};

const getSertQuantity = async trunk => {
    const trunkQuantity = await readForQuantity(trunk._id)
        .then(root => root && root.quantity || null);

    if (trunkQuantity) {
        return trunkQuantity;
    } else if (trunk.quantity && trunk.quantity.qt && trunk.quantity.unit) {
        await setQuantity({_id: trunk._id, quantity: trunk.quantity});
        return trunk.quantity;
    } else {
        return {};
    }
};

const readForQuantity = async (id) => roots().findOne(withId(id), quantityField);

const setQuantity = ({_id, quantity}) => roots().update(withId(_id), ({$set: {quantity}}), upsert);


export const insertRoot = ({trunk, root}) => addRoot(trunk._id, root._id);

export const removeRoot = ({trunkId, rootId}) => roots().update(withId(trunkId), pullFromRoots(rootId));

export const upsertRoot = async ({trunk, root}) => removeAddRoot({
    trunkId: trunk._id,
    rootId: root._id,
    quantity: await adaptQtUnit(trunk, root)
});

const removeAddRoot = async ({trunkId,rootId,quantity}) => {
    await removeRoot({trunkId,rootId});
    return await addRoot(trunkId, rootId, quantity);
};

const addRoot = async (trunkId, rootId, quantity) => roots().update(withId(trunkId), pushRoot(rootId, quantity), upsert);
