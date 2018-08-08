import {removeQuantity} from "mongo-queries-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import {withId} from "mongo-queries-blueforest"

const branches = () => col(cols.BRANCH)

const loadBranchs = _id => branches().findOne(withId(_id)).then(i => i || {_id, items: []})

export const loadNamedUnquantifiedBranch = _id =>
    loadBranchs(_id)
        .then(removeQuantity)

