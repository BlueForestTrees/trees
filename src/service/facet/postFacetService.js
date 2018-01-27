import {withId} from "../../util/query";
import {cols} from "../../const/collections";
import {col} from "../../repo/index";

const facets = () => col(cols.FACET);

const pushFacet = (facet) => ({$push: {facets: facet}});

export const addFacet = ({treeId, facet}) => facets().update(withId(treeId), pushFacet(facet));