import {object, upsert, withId} from "../../util/query";
import {cols} from "../../const/collections";
import {col} from "../../repo/index";
import {deleteFacets} from "../facetsService";

const facets = () => col(cols.FACET);

const pushFacet = ({_id, qt, unit}) => ({$push: {facets: {_id: object(_id), qt, unit}}});

export const setFacet = async ({treeId, facet}) => {
    await deleteFacets(treeId, facet._id);
    return addFacet({treeId,facet});
};

const addFacet = ({treeId, facet}) => facets().update(withId(treeId), pushFacet(facet), upsert);