import {create} from "../../service/trunk/postTrunkService"
import {Router, run} from 'express-blueforest'
import {validBodyColor, validId, validBodyName, optionalValidType, validBodyG} from "../../const/validations"
import {importAdemeTrunkEntries} from "../../service/trunk/postTrunkService"
import fileUpload from "express-fileupload"
import {validGod} from "../../service/auth/authService"
import {cols} from "../../const/collections"
import configure from "items-service"
import {col} from "mongo-registry/dist"

const router = Router()
module.exports = router
const trunkService = configure(() => col(cols.TRUNK))

router.post('/api/trunk',
    validId,
    validBodyColor,
    validBodyName,
    validBodyG,
    run(trunkService.insertOne)
)

router.post('/api/trunkBulk/ademe',
    validGod,
    fileUpload({files: 1, limits: {fileSize: 10 * 1024 * 1024}}),
    run(({}, req) => importAdemeTrunkEntries(req.files.file && req.files.file.data || req.files['xlsx.ademe.trunk'].data))
)

