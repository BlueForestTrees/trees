import {cols} from "../../const/collections";
import {col} from "../../db";
import {withIdIn} from "../../util/query";

const facetEntries = () => col(cols.FACET_ENTRY);

const peekFields = {name: 1};

export const peekFacetEntries = async _ids => facetEntries().find(withIdIn(_ids), peekFields).toArray();

export const getFacetEntryByName = async name => facetEntries().findOne({name});

export const getAllFacetEntries = async () => facetEntries().find({}).toArray();

export const searchFacetEntriesByNamepart = namePart => facetEntries()
    .find({name: {$regex: `.*${namePart}.*`}})
    .sort({name: 1})
    .toArray();