import {run} from '../../util/run'
import express from "express";
import {facetIdIsNotTrunkId, validItem} from "../../const/validations";
import {cols} from "../../const/collections";
import {col} from "../../db";
import configure from "trees-items-service";

const router = express.Router();
const insertFacet = configure(() => col(cols.FACET)).upsertItem;

module.exports = router;

router.post('/api/facet',
    [
        validItem("trunk"),
        validItem("facet"),
        facetIdIsNotTrunkId
    ],
    run(({trunk, facet}) => insertFacet(trunk, facet))
);