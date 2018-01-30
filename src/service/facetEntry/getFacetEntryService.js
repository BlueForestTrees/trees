import {cols} from "../../const/collections";
import {col} from "../../repo";
import {withId} from "../../util/query";

const facetEntries = () => col(cols.FACET_ENTRY);

const peekFields = {name: 1};

export const peekFacetEntry = async _id => facetEntries().findOne(withId(_id), peekFields);
