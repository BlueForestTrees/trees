import {cols} from "../../const/collections"
import {col} from "mongo-registry"

const collection = () => col(cols.FACET_ENTRY)

const idField = {_id: 1}

export const getFacetEntryByName = async name => collection().findOne({name})

export const getAllFacetEntries = async () => collection().find({}).toArray()