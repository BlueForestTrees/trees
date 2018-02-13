import {cols} from "../../const/collections";
import {col} from "../../repo";
import {getFacetEntryByName} from "./getFacetEntryService";
import {debug} from "../../../test/testIntegPlumbing";

const facetsEntry = () => col(cols.FACET_ENTRY);


export const replaceAllFacetEntries = async (data) => {
    const col = await facetsEntry();
    await col.remove();
    await col.insert(data);
    return col.find().toArray();
};

export const addFacetEntry = async facetEntry => {
    return await getFacetEntryByName(facetEntry.name) ||
        {
            _id: await facetsEntry().insertOne(facetEntry).insertedId,
            ...facetEntry
        };
};