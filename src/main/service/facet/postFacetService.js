import {pushItem, upsert, withId} from "trees-query";
import {cols} from "../../const/collections";
import {col} from "../../db";
import {deleteFacets} from "./deleteFacetService";

const facets = () => col(cols.FACET);

export const setFacet = async ({treeId, facet}) => {
    await deleteFacets({treeId, facetIds:[facet._id]});
    return addFacet({treeId,facet});
};

const addFacet = ({treeId, facet}) => facets().update(withId(treeId), pushItem(facet), upsert);