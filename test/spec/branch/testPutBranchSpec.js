import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {cols} from "../../../src/const/collections"
import {bleTrunk, farineTrunk, gateauTrunk, laitBranch, laitTrunk} from "../../database/gateau"
import {setBqt} from "test-api-express-mongo/dist/domain"
import {clon} from "test-api-express-mongo/dist/util"
import _ from 'lodash'
import {withIdBqt} from "test-api-express-mongo/dist/domain"

const trunk = withIdBqt(bleTrunk._id, 60*20)
const branch = withIdBqt(farineTrunk._id, 10000)
export const setQuantityBranchSpec = {
    req: {
        url: `/api/branch`,
        method: "PUT",
        body: {trunk, branch}
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.BRANCH,
            doc: {
                ...trunk,
                items: [branch]
            }
        }
    }
}

const updatedBranchs = clon(laitBranch.items)
setBqt(updatedBranchs[1], 166.66666666666669)
export const updateQuantityBranchSpec = {
    req:{
        url:"/api/branch",
        method:"PUT",
        body: {
            trunk: withIdBqt(laitTrunk._id, 0.03),
            branch: withIdBqt(gateauTrunk._id, 250)
        }
    },
    res:{
        body: oneModifiedResponse
    },
    db:{
        expected: {
            colname: cols.BRANCH,
            doc: {
                ...(_.omit(laitBranch, "items")),
                items: updatedBranchs,
            }
        }
    }
}