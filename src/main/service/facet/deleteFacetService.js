import {cols} from "../../const/collections";
import {col} from "../../repo";
import {pullFromFacets, withId} from "../../util/query";


const facets = () => col(cols.FACET);

module.exports = {

    deleteFacets: ({treeId, facetIds}) => facets().update(withId(treeId), pullFromFacets(facetIds)),

};