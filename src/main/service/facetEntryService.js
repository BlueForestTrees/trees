import {cols} from "../const/collections";
import {col} from "../repo";

const facetsEntry = () => col(cols.FACET_ENTRY);

const get = async name => (await facetsEntry()).findOne({name});

const putall = async (data) => {
    const col = await facetsEntry();
    await col.remove();
    await col.insert(data);
    return col.find().toArray();
};

module.exports = {

    search: async namePart => await facetsEntry()
        .find({name: {$regex: `.*${namePart}.*`}})
        .sort({name: 1})
        .toArray(),

    purgeFacets: async () => await facetsEntry().deleteMany(),

    add: async facet => (await get(facet.name) || {_id: await facetsEntry().insertOne(facet).insertedId, ...facet}),

    listall: async () => (await facetsEntry()).find({}).toArray(),

    get,

    putall
};