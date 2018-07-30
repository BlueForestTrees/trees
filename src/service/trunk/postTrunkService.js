import {cols} from "../../const/collections"
import {col} from "trees-db-version/dist"
import _ from 'lodash'
import {getTrunk} from "./getTrunkService"
import {updateName} from './putTrunkService'

const trunks = () => col(cols.TRUNK)

export const createOrClone = ({sourceId, name}) => sourceId ? clone(sourceId) : create({name})

export const putall = async (data) => {
    await trunks().remove()
    await trunks().insert(data)
    return trunks().find().toArray()
}

export const create = async (trunk,req) => {
    console.log("insertion de", trunk)
    return trunks().insertOne({...trunk, name_lower: trunk.name.toLowerCase()})
}

const clone = async sourceId => {
    const clone = await create(_.omit(await getTrunk(sourceId), '_id'))
    const renamed = {_id: clone._id, name: `${clone.name}${clone._id}`}

    await updateName(renamed)

    return renamed
}