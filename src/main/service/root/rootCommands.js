import {cols} from "../../const/collections";
import {col} from "../../db";
import {GrandeurMismatchError, UnitInvalidError} from "../../exceptions/Errors";
import {pullItem, pushItem, quantityField, upsert, withId} from "../../util/query";
import {qtUnitCoef} from "trees-common/dist/units";

const roots = () => col(cols.ROOT);

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


export const insertRoot = ({trunk, root}) =>
    removeRoot({trunkId: trunk._id, rootId: root._id})
        .then(() => addRoot(trunk._id, root._id));

export const upsertRoot = async ({trunk, root}) =>
    removeRoot({trunkId: trunk._id, rootId: root._id})
        .then(() => adaptQtUnit(trunk, root))
        .then(quantity => addRoot(trunk._id, root._id, quantity));

export const removeRoot = ({trunkId, rootId}) => roots().update(withId(trunkId), pullItem(rootId));
const addRoot = async (trunkId, rootId, quantity) => roots().update(withId(trunkId), pushItem({_id: rootId, quantity}), upsert);
