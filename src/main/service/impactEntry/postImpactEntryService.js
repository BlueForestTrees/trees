import {cols} from "../../const/collections";
import {col} from "../../db";
import {getImpactEntryByName} from "./getImpactEntryService";

const impactsEntry = () => col(cols.IMPACT_ENTRY);


export const replaceAllImpactEntries = async (data) => {
    const col = await impactsEntry();
    await col.remove();
    await col.insert(data);
    return col.find().toArray();
};

export const addImpactEntry = async ({name, grandeur}) =>{
    const existing = await getImpactEntryByName(name);
    if(existing)return existing;

    await impactsEntry()
        .insertOne({
            name, grandeur,
            name_lower: name.toLowerCase()
        });

    return getImpactEntryByName(name);

};