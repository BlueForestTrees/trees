import {addImpactEntry, importAdemeEntries} from "../../service/impactEntry/postImpactEntryService"
import {validColor, validGrandeur, validId, validName} from "../../const/validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import fileUpload from "express-fileupload"


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
    fileUpload({files: 1, limits: {fileSize: 5 * 1024 * 1024}}),
    run(({}, req) => importAdemeEntries(req.files.file && req.files.file.data || req.files['xlsx.ademe.impact'].data))
)