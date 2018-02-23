import {cols} from "../../const/collections";
import {col} from "../../repo";
import {getImpactEntryByName} from "./getImpactEntryService";

const impactsEntry = () => col(cols.IMPACT_ENTRY);


export const replaceAllImpactEntries = async (data) => {
    const col = await impactsEntry();
    await col.remove();
    await col.insert(data);
    return col.find().toArray();
};

export const addImpactEntry = async impactEntry => {
    return await getImpactEntryByName(impactEntry.name) ||
        {
            _id: await impactsEntry().insertOne(impactEntry).insertedId,
            ...impactEntry
        };
};