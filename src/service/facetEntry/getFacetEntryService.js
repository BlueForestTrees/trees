import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"

const collection = () => col(cols.FACET_ENTRY)

const idField = {_id: 1}
const searchMixin = {color: 1, name: 1, grandeur: 1}

export const getFacetEntryByName = async name => collection().findOne({name})

export const getFacetEntryIdByName = async name => collection().findOne({name}, idField)

export const getAllFacetEntries = async () => collection().find({}).toArray()

export const searchFacetEntriesByNamepart = namePart => collection()
    .find({name_lower: {$regex: `.*${namePart.toLowerCase()}.*`}}, searchMixin)
    .sort({name: 1})
    .toArray()