import {cols} from "../../const/collections";
import {col} from "../../repo/index";
import {withId} from "../../util/query";

const facets = () => col(cols.FACET);

export const getFacets = async _id => facets().findOne(withId(_id));