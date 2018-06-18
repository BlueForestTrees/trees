import {cols} from "../../const/collections";
import {col} from "../../db";
import {withIdIn} from "trees-query";

const facetEntries = () => col(cols.FACET_ENTRY);

const peekFields = {name: 1, color: 1};
const idField = {_id: 1};
const searchMixin = {color: 1, name: 1, grandeur: 1};


export const peekFacetEntries = async _ids => facetEntries().find(withIdIn(_ids), peekFields).toArray();

export const getFacetEntryByName = async name => facetEntries().findOne({name});

export const getFacetEntryIdByName = async name => facetEntries().findOne({name}, idField);

export const getAllFacetEntries = async () => facetEntries().find({}).toArray();

export const searchFacetEntriesByNamepart = namePart => facetEntries()
    .find({name_lower: {$regex: `.*${namePart}.*`}}, searchMixin)
    .sort({name: 1})
    .toArray();