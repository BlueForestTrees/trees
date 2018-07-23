import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import {withIdIn} from "trees-query";
import regexEscape from "regex-escape";

const getFields = {name_lower: 0};
const idField = {_id:1};

const impactEntries = () => col(cols.IMPACT_ENTRY);

const peekFields = {name: 1, color: 1};

export const peekImpactEntries = async _ids => impactEntries().find(withIdIn(_ids), peekFields).toArray();

export const getImpactEntryByName = async name => impactEntries().findOne({name}, getFields);

export const getImpactEntryIdByName = async name => impactEntries().findOne({name}, idField);

export const getAllImpactEntries = async () => impactEntries().find({}, getFields).toArray();

export const searchImpactEntriesByNamepart = namePart => impactEntries()
    .find({name_lower: {$regex: `.*${regexEscape(namePart.toLowerCase())}.*`}}, getFields)
    .sort({name: 1})
    .toArray();