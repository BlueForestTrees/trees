import {oneResponse} from "test-api-express-mongo/dist/domain"
import {cols} from "../../../src/const/collections"
import {bleTrunk, farineTrunk} from "../../database/gateau"


export const postRootFarineBle = {
    req: {
        method: "POST",
        path: `/api/root`,
        body: {trunk: {_id: farineTrunk._id}, root: {_id: bleTrunk._id}}
    },
    res: {
        body: oneResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: {
                _id: farineTrunk._id,
                items: [{_id: bleTrunk._id}],
            }
        }
    }
}
