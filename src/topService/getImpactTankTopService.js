import _ from 'lodash'
import {flatten, listify, summify} from "../util/calculations"
import {readRootTree} from "../service/root/rootService"
import {loadDenseQuantifiedImpacts} from "../service/impact/getImpactService"

export const getImpactTank = async (qt, unit, _id) => (
    {
        _id,
        quantity: {qt, unit},
        items: summify(flatten(await Promise.all(_.map(listify(await readRootTree(qt, unit, _id)), loadDenseQuantifiedImpacts))))
    }
)