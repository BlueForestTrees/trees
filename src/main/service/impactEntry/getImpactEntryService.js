import {cols} from "../../const/collections";
import {col} from "../../repo";
import {withId} from "../../util/query";

const impactEntries = () => col(cols.IMPACT_ENTRY);

const peekFields = {name: 1};

export const peekImpactEntry = async _id => impactEntries().findOne(withId(_id), peekFields);

export const getImpactEntryByName = async name => impactEntries().findOne({name});

export const getAllImpactEntries = async () => impactEntries().find({}).toArray();

export const searchImpactEntriesByNamepart = namePart => impactEntries()
    .find({name: {$regex: `.*${namePart}.*`}})
    .sort({name: 1})
    .toArray();