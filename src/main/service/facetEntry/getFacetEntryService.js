import {cols} from "../../const/collections";
import {col} from "../../repo";
import {withId} from "../../util/query";

const facetEntries = () => col(cols.FACET_ENTRY);

const peekFields = {name: 1};

export const peekFacetEntry = async _id => facetEntries().findOne(withId(_id), peekFields);

export const getFacetEntryByName = async name => facetEntries().findOne({name});

export const getAllFacetEntries = async () => facetEntries().find({}).toArray();

export const searchFacetEntriesByNamepart = namePart => facetEntries()
    .find({name: {$regex: `.*${namePart}.*`}})
    .sort({name: 1})
    .toArray();