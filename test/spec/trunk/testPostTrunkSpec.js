import _ from 'lodash'
import {cols} from "../../../src/const/collections"
import {aTrunk} from "../../database/lettres"
import {withValidationError} from "test-api-express-mongo/dist/domain"
import {createObjectId} from "test-api-express-mongo/dist/util"
import {authGod} from "../../database/users"
import path from 'path'


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

export const postTrunkFileSpec = {
    req: {
        url: "/api/trunkBulk/ademe",
        method: "POST",
        file: {
            field: "xlsx.ademe.trunk",
            path: path.resolve("test/files/CUT_BIG_BI_1.09__02_Procedes_Details.xlsx")
        },
        headers: {
            ...authGod
        }
    },
    res: {
        bodypath: [
            {path: "$.ok", value: [true]},
            {path: "$.upsertions", value: [28]},
            {path: "$.insertions", value: [0]},
        ]
    }
}