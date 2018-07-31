import {cols} from "../../const/collections"
import {col} from "trees-db-version/dist"
import regexEscape from "regex-escape"
import {appendItemsInfos} from "../common/commonService"

const getFields = {name_lower: 0}

const collection = () => col(cols.IMPACT_ENTRY)

export const appendImpactInfos = appendItemsInfos(cols.IMPACT_ENTRY, {name: 1, color: 1})

export const getImpactEntryByName = async name => collection().findOne({name}, getFields)
export const getAllImpactEntries = async () => collection().find({}, getFields).toArray()
export const searchImpactEntriesByNamepart = namePart => collection()
    .find({name_lower: {$regex: `.*${regexEscape(namePart.toLowerCase())}.*`}}, getFields)
    .sort({name: 1})
    .toArray()