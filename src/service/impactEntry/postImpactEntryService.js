import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import {getImpactEntryByName, getImpactEntryIdByName} from "./getImpactEntryService";

const impactsEntry = () => col(cols.IMPACT_ENTRY);


export const replaceAllImpactEntries = async (data) => {
    const col = await impactsEntry();
    await col.remove();
    await col.insert(data);
    return col.find().toArray();
};

export const addImpactEntry = async entry =>
    await getImpactEntryIdByName(entry.name)
    ||
    ({_id: (await insertEntry(entry)).insertedId});

export const insertEntry = async entry => {
    entry.name_lower = entry.name.toLowerCase();
    return impactsEntry().insertOne(entry);
};