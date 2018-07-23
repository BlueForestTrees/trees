import {run} from '../../util/run'
import express from "express";
import {impactIdIsNotTrunkId, validItem} from "../../const/validations";
import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import configure from "trees-items-service";

const router = express.Router();
const insertImpact = configure(() => col(cols.IMPACT)).upsertItem;

module.exports = router;

router.post('/api/impact',
    validItem("trunk"),
    validItem("impact"),
    impactIdIsNotTrunkId,
    run(({trunk, impact}) => insertImpact(trunk, impact))
);