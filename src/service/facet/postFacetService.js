import {pushFacet, upsert, withId} from "../../util/query";
import {cols} from "../../const/collections";
import {col} from "../../repo";
import {deleteFacets} from "./deleteFacetService";

const facets = () => col(cols.FACET);

export const setFacet = async ({treeId, facet}) => {
    await deleteFacets({treeId, facetIds:[facet._id]});
    return addFacet({treeId,facet});
};

const addFacet = ({treeId, facet}) => facets().update(withId(treeId), pushFacet(facet), upsert);