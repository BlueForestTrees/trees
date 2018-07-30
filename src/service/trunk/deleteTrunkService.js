import {withId} from "trees-query"
import {cols} from "../../const/collections"
import {col} from "trees-db-version/dist"

const trunks = () => col(cols.TRUNK)

export const remove = id => trunks().deleteOne(withId(id))