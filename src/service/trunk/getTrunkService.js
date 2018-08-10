import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"

const collection = () => col(cols.TRUNK)

const searchMixin = {color: 1, name: 1, grandeur: 1, quantity: 1, type: 1}

export const search = (name, type, pageSize, afterIdx) => collection()
    .find(prepareQuery(name, type, afterIdx), searchMixin)
    .sort({_id: 1})
    .limit(pageSize)
    .toArray()

const prepareQuery = (name, type, afterIdx) => {
    const query = {}
    if (name) {
        query.name = {$regex: `^.*${name}.*`}
    }
    if (type) {
        query.type = type
    }
    if (afterIdx) {
        query._id = {$gt: afterIdx}
    }
    return query
}

export const resolveTrunkExternId = externId => collection().findOne({externId}, {_id: 1, quantity: 1})