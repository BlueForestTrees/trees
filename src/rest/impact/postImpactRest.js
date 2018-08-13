import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"
import {validGod} from "../../service/auth/authService"
import fileUpload from "express-fileupload"
import {parseImpactCsv} from "../../util/csv"
import {validBodyBqt, validBodyId, validBodyImpactId, validBodyTrunkId} from "../../const/validations"
import {map} from 'lodash'

const router = Router()
const impactService = configure(() => col(cols.IMPACT))
const impactEntryService = configure(() => col(cols.IMPACT_ENTRY))
const trunkService = configure(() => col(cols.TRUNK))

module.exports = router

router.post('/api/impact',
    validBodyId,
    validBodyTrunkId,
    validBodyImpactId,
    validBodyBqt,
    run(impactService.insertOne)
)

router.post('/api/impactBulk/ademe',
    validGod,
    fileUpload({files: 1, limits: {fileSize: 5 * 1024 * 1024}}),
    run(({}, req) => parseImpactCsv(req.files.file && req.files.file.data || req.files['csv.ademe.impact'].data)),
    run(ademeToBlueforestImpact),
    run(impactService.bulkWrite)
)

function ademeToBlueforestImpact(raws) {
    return Promise.all(map(raws, async raw => ({
        insertOne: {
            ...await resolveTrunkOrDefault(raw),
            items: await Promise.all(map(raw.items, resolveImpactOrDefault))
        }
    })))
}
const resolveTrunkOrDefault = async raw => {
    try {
        return await trunkService.findOne({externId: raw.externId}, {_id: 1}) || {externId: raw.externId}
    } catch (e) {
        return {externId: raw.externId}
    }
}
const resolveImpactOrDefault = async item => {
    try {
        return {
            ...await impactEntryService.findOne({externId: item.externId}, {_id: 1}) || {externId: item.externId},
            bqt: item.bqt
        }
    } catch (e) {
        return item
    }
}