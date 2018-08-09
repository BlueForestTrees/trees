import _ from 'lodash'
import {applyQuantity, flatten, listify, summify} from "../util/calculations"
import {cols} from "../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const readRootTree = configure(() => col(cols.ROOT)).initReadTree(cols.ROOT)

export const getImpactTank = async (qt, unit, _id) => (
    {
        _id,
        quantity: {qt, unit},
        items: summify(flatten(await Promise.all(_.map(listify(await readRootTree(qt, unit, _id)), loadDenseQuantifiedImpacts))))
    }
)
const itemService = configure(() => col(cols.IMPACT))
const loadDenseQuantifiedImpacts = ({bqt, g, _id}) => {
    return itemService.get(_id)
        .then(impact => applyQuantity({bqt, g}, impact))
        .then(impact => impact.items)
}