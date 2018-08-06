import {addImpactEntry, importAdemeImpactEntries} from "../../service/impactEntry/postImpactEntryService"
import {validColor, validGrandeur, validId, validName} from "../../const/validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import fileUpload from "express-fileupload"
import {validGod} from "../../service/auth/authService"


const router = Router()

module.exports = router

router.post('/api/impactEntry',
    validId,
    validName,
    validGrandeur,
    validColor,
    run(addImpactEntry)
)

router.post('/api/impactEntryBulk/ademe',
    validGod,
    fileUpload({files: 1, limits: {fileSize: 5 * 1024 * 1024}}),
    run(({}, req) => importAdemeImpactEntries(req.files.file && req.files.file.data || req.files['xlsx.ademe.impactEntry'].data))
)