import {cols} from "../../const/collections";
import {col} from "../../db";
import {getFacetEntryIdByName} from "./getFacetEntryService";

const facetsEntry = () => col(cols.FACET_ENTRY);


export const replaceAllFacetEntries = async (data) => {
    const col = await facetsEntry();
    await col.remove();
    await col.insert(data);
    return col.find().toArray();
};

export const addFacetEntry = async facetEntry =>
    await getFacetEntryIdByName(facetEntry.name)
    ||
    ({_id: (await insertEntry(facetEntry)).insertedId});

export const insertEntry = async entry => {
    entry.name_lower = entry.name.toLowerCase();
    return facetsEntry().insertOne(entry);
};