import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"

const facetEntries = () => col(cols.FACET_ENTRY)

export const purgeFacetsEntries = async () => facetEntries().deleteMany()