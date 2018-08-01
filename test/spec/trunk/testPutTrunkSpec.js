import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {cols} from "../../../src/const/collections"
import _ from 'lodash'
import {bleTrunk, gateauTrunk} from "../../database/gateau"
import {withQuantity} from "test-api-express-mongo/dist/domain"


const someNewName = "paPRika" + Math.random()
export const renameTrunkSpec = {
    req: {
        method: "PUT",
        url: `/api/trunk/${bleTrunk._id}`,
        body: {
            name: someNewName
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.TRUNK,
            doc: {
                name: someNewName,
                name_lower: someNewName.toLowerCase()
            }
        }
    }
}


const newGateauQuantity = withQuantity(1, "kg")
export const requantifyTrunkSpec = {
    req: {
        method: "PUT",
        url: `/api/trunk/${gateauTrunk._id}`,
        body: {
            ...newGateauQuantity
        }
    }, res: {
        body: oneModifiedResponse
    }, db: {
        expected: {
            colname: cols.TRUNK,
            doc: {
                ...(_.omit(gateauTrunk, 'quantity')),
                ...newGateauQuantity
            }
        }
    }
}

export const noUnitPutTrunkSpec = {
    req: {
        method: "PUT",
        url: `/api/trunk/${gateauTrunk._id}`,
        body: {
            quantity: {qt: 4}
        }
    }, res: {
        code:400
    }
}