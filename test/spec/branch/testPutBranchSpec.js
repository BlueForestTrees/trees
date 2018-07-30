import {oneModifiedResponse} from "trees-test/dist/domain"
import {cols} from "../../../src/const/collections"
import {bleTrunk, farineTrunk, gateauTrunk, laitBranch, laitTrunk} from "../../database/gateau"
import {setQuantity} from "trees-test/dist/domain"
import {clon} from "trees-test/dist/util"
import _ from 'lodash'
import {withIdQuantity} from "trees-test/dist/domain"

const trunk = withIdQuantity(bleTrunk._id, 20, "min")
const branch = withIdQuantity(farineTrunk._id, 10, "kg")
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
                items: [branch],
            }
        }
    }
}

const updatedBranchs = clon(laitBranch.items)
setQuantity(updatedBranchs[1], 166.66666666666666)
export const updateQuantityBranchSpec = {
    req:{
        url:"/api/branch",
        method:"PUT",
        body: {
            trunk: withIdQuantity(laitTrunk._id, 30,"L"),
            branch: withIdQuantity(gateauTrunk._id, 250,"g")
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

const updatedBranchsWithDifferentUnit = clon(laitBranch.items)
setQuantity(updatedBranchsWithDifferentUnit[1], 1, "kg")
export const updateQuantityAnotherUnitBranchSpec = {
    req:{
        url:"/api/branch",
        method:"PUT",
        body: {
            trunk: withIdQuantity(laitTrunk._id, 0.02, "m3"),
            branch: withIdQuantity(gateauTrunk._id, 1, "kg"),
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
                items: updatedBranchsWithDifferentUnit,
            }
        }
    }
}