import {cols} from "../../const/collections";
import {col} from "../../repo";
import {pullItems, withId} from "../../util/query";


const impacts = () => col(cols.IMPACT);

module.exports = {

    deleteImpacts: ({treeId, impactIds}) => impacts().update(withId(treeId), pullItems(impactIds)),

};