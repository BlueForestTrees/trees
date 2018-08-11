import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import regexEscape from "regex-escape"

const collection = () => col(cols.IMPACT_ENTRY)

export const getImpactEntryByName = async name => collection().findOne({name})
export const getAllImpactEntries = async () => collection().find({}).toArray()
export const searchImpactEntriesByNamepart = namePart => collection()
    .find({name: {$regex: `.*${regexEscape(namePart)}.*`}})
    .sort({name: 1})
    .toArray()

export const lookupImpactEntryByExternId = async externId => collection().findOne({externId}, {_id: 1})