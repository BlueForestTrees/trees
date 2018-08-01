import {withId} from "mongo-queries-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"

const trunks = () => col(cols.TRUNK)

export const remove = id => trunks().deleteOne(withId(id))