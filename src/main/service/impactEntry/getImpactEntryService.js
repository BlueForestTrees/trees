import {cols} from "../../const/collections";
import {col} from "../../db";
import {withIdIn} from "../../util/query";

const impactEntries = () => col(cols.IMPACT_ENTRY);

const peekFields = {name: 1};

export const peekImpactEntries = async _ids => impactEntries().find(withIdIn(_ids), peekFields).toArray();

export const getImpactEntryByName = async name => impactEntries().findOne({name});

export const getAllImpactEntries = async () => impactEntries().find({}).toArray();

export const searchImpactEntriesByNamepart = namePart => impactEntries()
    .find({name: {$regex: `.*${namePart}.*`}})
    .sort({name: 1})
    .toArray();