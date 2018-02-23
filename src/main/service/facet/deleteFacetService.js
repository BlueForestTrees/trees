import {cols} from "../../const/collections";
import {col} from "../../repo";
import {pullFromItems, withId} from "../../util/query";


const facets = () => col(cols.FACET);

module.exports = {

    deleteFacets: ({treeId, facetIds}) => facets().update(withId(treeId), pullFromItems(facetIds)),

};