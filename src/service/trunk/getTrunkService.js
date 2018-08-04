import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import {withIdIn} from "mongo-queries-blueforest"
import {debug} from "../../util/debug"
import {appendItemsInfos} from "../common/commonService"

const collection = () => col(cols.TRUNK)

const getFields = {name_lower: 0}
const searchMixin = {color: 1, name: 1, grandeur: 1, quantity: 1, type: 1}

export const appendTrunkInfos = appendItemsInfos(cols.TRUNK, {name: 1, color: 1})
export const getTrunk = _id => collection().findOne({_id}, getFields)
export const getTrunks = _ids => {
    return collection().find(withIdIn(_ids), getFields).toArray()
}

export const getQuantifiedTrunk = async (qt, unit, _id) => ({...await getTrunk(_id), quantity: {qt, unit}})

export const search = (name, type, pageSize, afterIdx) => collection()
    .find(prepareQuery(name, type, afterIdx), searchMixin)
    .sort({_id: 1})
    .limit(pageSize)
    .toArray()

const prepareQuery = (name, type, afterIdx) => {
    const query = {}
    if (name) {
        query.name_lower = {$regex: `^${name.toLowerCase()}.*`}
    }
    if (type) {
        query.type = type
    }
    if (afterIdx) {
        query._id = {$gt: afterIdx}
    }
    return query
}