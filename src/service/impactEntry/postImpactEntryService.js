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

export const addImpactEntry = entry => impactsEntry().insertOne({...entry, name_lower: entry.name.toLowerCase()});