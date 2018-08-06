import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {impactIdIsNotTrunkId, validItem} from "../../const/validations"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"
import {validGod} from "../../service/auth/authService"
import {importAdemeImpact} from "../../service/impact/postImpactService"

const router = Router()
const insertImpact = configure(() => col(cols.IMPACT)).upsertItem

module.exports = router

router.post('/api/impact',
    validItem("trunk"),
    validItem("impact"),
    impactIdIsNotTrunkId,
    run(({trunk, impact}) => insertImpact(trunk, impact))
)

router.post('/api/impactBulk/ademe',
    validGod,
    fileUpload({files: 1, limits: {fileSize: 5 * 1024 * 1024}}),
    run(({}, req) => importAdemeImpact(req.files.file && req.files.file.data || req.files['csv.ademe.impact'].data))
)