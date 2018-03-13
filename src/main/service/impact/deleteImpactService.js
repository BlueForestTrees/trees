import {cols} from "../../const/collections";
import {col} from "../../db";
import {pullItems, withId} from "../../util/query";

const impacts = () => col(cols.IMPACT);

export const deleteImpacts = ({trunk, impactIds}) => impacts().update(withId(trunk._id), pullItems(impactIds));