import {validPathTrunkId} from "../validations"
import {col} from "mongo-registry"
import configure from "items-service"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {treeToList, mergeList, mergeListBy} from "../../util/calculations"

const router = Router()

module.exports = router

const readRootTree = configure(() => col(cols.ROOT)).treeRead(cols.ROOT, "trunkId", "rootId")
const readAllQuantifiedImpacts = configure(() => col(cols.IMPACT)).readAllQuantified
const impactEntryService = configure(() => col(cols.IMPACT_ENTRY))

router.get('/api/tree/impacttank/:trunkId',
    validPathTrunkId,
    run(readRootTree, "READ TREE"),
    run(treeToList, "TREE TO LIST"),
    run(mergeList, "MERGED LIST"),
    run(readAllQuantifiedImpacts, "READ IMPACTS"),
    run(mergeListBy("impactId"), "MERGE ITEMS"),
    run(impactEntryService.append(
        "impactId",
        {name: 1, color: 1, g: 1},
        (impact, impactEntry) => ({
            _id: impact.impactId,
            name: impactEntry.name,
            color: impactEntry.color,
            quantity: {bqt: impact.bqt, g: impactEntry.g, eq: impactEntry.eq}
        })
    ))
)