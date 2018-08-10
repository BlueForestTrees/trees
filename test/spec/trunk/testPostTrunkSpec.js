import _ from 'lodash'
import {cols} from "../../../src/const/collections"
import {aTrunk} from "../../database/lettres"
import {withValidationError} from "test-api-express-mongo/dist/domain"
import {createObjectId} from "test-api-express-mongo/dist/util"


const cloneName = (newId, tree) => tree.name + newId
export const cloneTrunkSpec = {}
cloneTrunkSpec.req = {body: {sourceId: aTrunk._id}}
cloneTrunkSpec.res = {body: _id => ({_id, name: cloneName(_id, aTrunk)})}
cloneTrunkSpec.db = {
    expected: _id => ({
        colname: cols.TRUNK,
        doc: {
            ...(_.omit(aTrunk, ['_id', 'name'])),
            _id,
            name: cloneName(_id, aTrunk),
        }
    })
}