import {create} from "../../service/trunk/postTrunkService"
import {Router, run} from 'express-blueforest'
import {validColor, validId, validName, optionalValidType} from "../../const/validations"
import {importAdemeTrunkEntries} from "../../service/trunk/postTrunkService"
import fileUpload from "express-fileupload"
import {validGod, validToken} from "../../service/auth/authService"


const router = Router()
module.exports = router

router.post('/api/trunk',
    validId,
    validColor,
    validName,
    optionalValidType,
    run(create)
)

router.post('/api/trunkBulk/ademe',
    validGod,
    fileUpload({files: 1, limits: {fileSize: 10 * 1024 * 1024}}),
    run(({}, req) => importAdemeTrunkEntries(req.files.file && req.files.file.data || req.files['xlsx.ademe.trunk'].data))
)

