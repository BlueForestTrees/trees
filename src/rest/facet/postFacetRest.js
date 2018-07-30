import {run} from 'trees-express'
import {Router} from "trees-express";
import {facetIdIsNotTrunkId, validItem} from "../../const/validations";
import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import configure from "trees-items-service";

const router = Router();
const insertFacet = configure(() => col(cols.FACET)).upsertItem;

module.exports = router;

router.post('/api/facet',
    validItem("trunk"),
    validItem("facet"),
    facetIdIsNotTrunkId,
    run(({trunk, facet}) => insertFacet(trunk, facet))
);