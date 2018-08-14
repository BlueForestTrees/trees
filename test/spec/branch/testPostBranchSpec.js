import {oneModifiedResponse, oneUpsertedResponse} from "test-api-express-mongo/dist/domain"
import {cols} from "../../../src/const/collections"
import {bleTrunk, farineTrunk} from "../../database/gateau"


export const farineToBleBranchAddSpec = {
    req: {
        path:"/api/branch",
        method:"POST",
        body: {
            trunk: {_id: bleTrunk._id}, branch: {_id: farineTrunk._id}
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.BRANCH,
            doc: {
                _id: bleTrunk._id,
                items: [{"_id": farineTrunk._id,}],
            }
        }
    }
}
