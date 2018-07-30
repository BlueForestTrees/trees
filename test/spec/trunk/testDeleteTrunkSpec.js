import {cols} from "../../../src/const/collections"
import {gateauTrunk} from "../../database/gateau"

export const trunkDeletionSpec = {
    req: {
        url: `/api/trunk/${gateauTrunk._id}`,
        method: "DELETE"
    },
    db: {
        expected: {
            colname: cols.TRUNK,
            missingDoc: {_id: gateauTrunk._id}
        }
    }
}