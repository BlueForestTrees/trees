import {cols} from "../../const/collections"
import {col} from "trees-db-version/dist"
import {AllreadyExistError} from "../../exceptions/Errors"

const impactsEntry = () => col(cols.IMPACT_ENTRY)

export const addImpactEntry = entry => impactsEntry().insertOne({...entry, name_lower: entry.name.toLowerCase()})