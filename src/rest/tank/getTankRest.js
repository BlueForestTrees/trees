import {validPathId} from "../../const/validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest";
import {omit} from 'lodash'
import {quantified, mergeTwoItems} from "../../util/calculations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()
module.exports = router
const rootService = configure(() => col(cols.ROOT))
const readRootTree = rootService.initReadTree(cols.ROOT)

export const getTank = (qt, unit, _id) =>
    readRootTree(qt, unit, _id)
        .then(async tree => {
            tree.items = await mergeTwoItems(tankfy(tree.items))
            return tree
        })

const tankfy = items => {
    const tank = []
    const browser = items.slice()
    let i = 0
    for (i; i < browser.length; i++) {
        const item = browser[i]
        if (item.quantity && item.items && quantified(item.items)) {
            browser.push(...item.items)
        } else {
            tank.push(omit(item, "items"))
        }
    }
    return tank
}

router.get('/api/tank/:_id',
    validPathId,
    run(getTank)
)