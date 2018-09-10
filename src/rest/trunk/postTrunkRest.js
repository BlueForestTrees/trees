import {Router, run} from 'express-blueforest'
import {
    validBodyColor,
    validId,
    validBodyName,
    validBodyQuantityBqt,
    validBodyQuantityG,
    validUser, setUserIdIn
} from "../../validations"
import {cols} from "../../collections"
import configure from "items-service"
import {col} from "mongo-registry"

const router = Router()
module.exports = router
const trunkService = configure(() => col(cols.TRUNK))

router.post('/api/tree/trunk',
    validId,
    validBodyColor,
    validBodyName,
    validBodyQuantityG,
    validBodyQuantityBqt,
    validUser,
    run(setUserIdIn("oid")),
    run(trunkService.insertOne)
)