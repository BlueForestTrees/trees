import {removeQuantity} from "mongo-queries-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import {withId} from "mongo-queries-blueforest"

const roots = () => col(cols.ROOT)

export const readRoot = _id => roots().findOne(withId(_id))

export const loadNamedUnquantifiedRoot = _id =>
    loadRoots(_id)
        .then(removeQuantity)

const loadRoots = _id =>
    readRoot(_id)
        .then(roots => roots || {_id, items: []})