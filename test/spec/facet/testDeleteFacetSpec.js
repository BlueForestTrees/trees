import {oneModifiedResponse} from "api-test/dist/domain"
import {remove} from "api-test/dist/util"
import {cols} from "../../../src/const/collections"
import {bleFacets} from "../../database/gateau"

export const facetDeletionSpec = {
    req: {
        url: "/api/facet/deletion",
        method: "POST",
        body: {
            treeId: bleFacets._id,
            facetIds: [bleFacets.items[0]._id]
        }
    },
    res: {
        expected: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.FACET,
            doc: remove(bleFacets, "items", {_id: bleFacets.items[0]._id})
        }
    }
}