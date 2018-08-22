import {cols} from "../../const/collections"
import {col} from "mongo-registry"

const impactEntries = () => col(cols.IMPACT_ENTRY)

export const purgeImpactsEntries = async () => impactEntries().deleteMany()