import {cols} from "../../const/collections"
import {col} from "trees-db-version/dist"
import {getFacetEntryIdByName} from "./getFacetEntryService"

const facetsEntry = () => col(cols.FACET_ENTRY)


export const replaceAllFacetEntries = async (data) => {
    const col = await facetsEntry()
    await col.remove()
    await col.insert(data)
    return col.find().toArray()
}

export const addFacetEntry = entry => facetsEntry().insertOne({...entry, name_lower: entry.name.toLowerCase()})

export const insertEntry = async entry => {
    entry.name_lower = entry.name.toLowerCase()
    return facetsEntry().insertOne(entry)
}