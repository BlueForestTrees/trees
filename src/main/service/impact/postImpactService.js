import {pushItem, upsert, withId} from "../../util/query";
import {cols} from "../../const/collections";
import {col} from "../../repo";
import {deleteImpacts} from "./deleteImpactService";

const impacts = () => col(cols.IMPACT);

export const setImpact = async ({treeId, impact}) => {
    await deleteImpacts({treeId, impactIds:[impact._id]});
    return addImpact({treeId,impact});
};

const addImpact = ({treeId, impact}) => impacts().update(withId(treeId), pushItem(impact), upsert);