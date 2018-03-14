import {cols} from "../../const/collections";
import {col} from "../../db";
import {pullItems, withId} from "trees-query";

const impacts = () => col(cols.IMPACT);

export const deleteImpacts = ({treeId, impactIds}) => impacts().update(withId(treeId), pullItems(impactIds));