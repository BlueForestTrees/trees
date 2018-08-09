import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import regexEscape from "regex-escape"

const getFields = {name_lower: 0}

const collection = () => col(cols.IMPACT_ENTRY)

export const getImpactEntryByName = async name => collection().findOne({name}, getFields)
export const getAllImpactEntries = async () => collection().find({}, getFields).toArray()
export const searchImpactEntriesByNamepart = namePart => collection()
    .find({name_lower: {$regex: `.*${regexEscape(namePart.toLowerCase())}.*`}}, getFields)
    .sort({name: 1})
    .toArray()

export const lookupImpactEntryByExternId = async externId => collection().findOne({externId}, {_id: 1})