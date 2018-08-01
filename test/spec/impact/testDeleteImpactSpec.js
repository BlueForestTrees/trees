import {oneModifiedResponse} from "api-test/dist/domain"
import {remove} from "api-test/dist/util"
import {cols} from "../../../src/const/collections"
import {bleImpacts} from "../../database/gateau"

export const impactDeletionSpec = {
    req: {
        url: `/api/impact/deletion`,
        method: "POST",
        body: {
            treeId: bleImpacts._id,
            impactIds: [bleImpacts.items[0]._id]
        }
    },
    res: {
        expected: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.IMPACT,
            doc: remove(bleImpacts, "items", {_id: bleImpacts.items[0]._id})
        }
    }
}