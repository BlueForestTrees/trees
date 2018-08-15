import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"
import {validPathTrunkId} from "../../const/validations"

const router = Router()

module.exports = router

const facetService = configure(() => col(cols.FACET))
const facetEntryService = configure(() => col(cols.FACET_ENTRY))

router.get('/api/facet/:trunkId',
    validPathTrunkId,
    run(facetService.findMixin({trunkId: 0})),
    run(facetEntryService.append(
        "facetId",
        {name: 1, color: 1, g: 1},
        (facet, facetEntry) => ({
            _id: facet._id,
            name: facetEntry.name,
            color: facetEntry.color,
            quantity: {bqt: facet.bqt, g: facetEntry.g}
        })
    ))
)