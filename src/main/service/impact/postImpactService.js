import {pushItem, upsert, withId} from "../../util/query";
import {cols} from "../../const/collections";
import {col} from "../../db";
import {deleteImpacts} from "./deleteImpactService";

const impacts = () => col(cols.IMPACT);

export const setImpact = async ({trunk, impact}) => {
    await deleteImpacts({trunk, impactIds: [impact._id]});
    return addImpact({trunk, impact});
};

const addImpact = ({trunk, impact}) => impacts().update(withId(trunk._id), pushItem(impact), upsert);