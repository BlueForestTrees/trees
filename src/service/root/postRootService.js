import {GrandeurMismatchError, TrunkUnitInvalidError} from "../../exceptions/Errors";
import {pullFromRoots, pushRoot, upsert, withId} from "../../util/query";
import {qtUnitCoef} from "../grandeursService";
import {getSertQuantity} from "../trunk/putTrunkService";
import {cols} from "../../const/collections";
import {col} from "../../repo/index";
import {removeRoot} from "./deleteRootService";

const roots = () => col(cols.ROOT);



export const upsertRoot = async ({trunk, root}) => removeAddRoot({
    trunkId: trunk._id,
    rootId: root._id,
    ...await adaptQtUnit(trunk, root)
});

const removeAddRoot = async (root) => {
    await removeRoot(root);
    return await addRoot(root);
};
const addRoot = async ({trunkId, rootId, qt, unit}) => roots().update(withId(trunkId), pushRoot(rootId, qt, unit), upsert);

const adaptQtUnit = async (trunk, root) => {
    let dbTrunkQt = await getSertQuantity(trunk);
    let trunkCoef = 0;

    try {
        trunkCoef = qtUnitCoef(dbTrunkQt, trunk.quantity);
    } catch (e) {
        if (e instanceof GrandeurMismatchError) {
            throw new TrunkUnitInvalidError(`unité de trunk incompatible`, e);
        }
    }

    return {qt: trunkCoef * root.quantity.qt, unit: root.quantity.unit};
};


