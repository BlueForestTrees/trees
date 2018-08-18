import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"
import {validGod} from "../../service/auth/authService"
import fileUpload from "express-fileupload"
import {parseImpactCsv} from "../../util/csv"
import {validBodyBqt, validBodyId, validBodyImpactId, validBodyTrunkId} from "../validations"
import {map} from 'lodash'
import {createObjectId} from "mongo-queries-blueforest"

const router = Router()
const impactService = configure(() => col(cols.IMPACT))
const impactEntryService = configure(() => col(cols.IMPACT_ENTRY))
const trunkService = configure(() => col(cols.TRUNK))

module.exports = router

const importImpactsByChunks = async raws => {
    const length = raws.length
    for (let i = 0, chunk = 100; i < length; i += chunk) {
        await impactService.bulkWrite(await ademeToBlueforestImpact(raws.slice(i, i + chunk)))
    }
    return length
}

const ademeToBlueforestImpact = raws => Promise.all(map(raws, async raw => ({
    insertOne: {
        _id: createObjectId(),
        ...await resolveTrunkId(raw),
        ...await resolveImpactId(raw),
        bqt: raw.bqt
    }
})))

const resolveTrunkId = async raw => {
    const doc = (await trunkService.findOne({externId: raw.trunkExternId}, {_id: 1}))
    return (doc && {trunkId: doc._id}) || {trunkExternId: raw.trunkExternId}
}
const resolveImpactId = async raw => {
    const doc = await impactEntryService.findOne({externId: raw.impactExternId}, {_id: 1})
    return (doc && {impactId: doc._id}) || {impactExternId: raw.impactExternId}
}

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
    run(importImpactsByChunks)
)