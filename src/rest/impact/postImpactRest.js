import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {impactIdIsNotTrunkId, validItem} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()
const insertImpact = configure(() => col(cols.IMPACT)).upsertItem

module.exports = router

router.post('/api/impact',
    validItem("trunk"),
    validItem("impact"),
    impactIdIsNotTrunkId,
    run(({trunk, impact}) => insertImpact(trunk, impact))
)