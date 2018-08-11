import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"

const facetsEntry = () => col(cols.FACET_ENTRY)


export const replaceAllFacetEntries = async (data) => {
    const col = await facetsEntry()
    await col.remove()
    await col.insert(data)
    return col.find().toArray()
}

export const insertEntry = async entry => facetsEntry().insertOne(entry)