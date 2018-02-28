import {cols} from "../../const/collections";
import {col} from "../../repo";
import {pullItems, withId} from "../../util/query";


const facets = () => col(cols.FACET);

module.exports = {

    deleteFacets: ({treeId, facetIds}) => facets().update(withId(treeId), pullItems(facetIds)),

};