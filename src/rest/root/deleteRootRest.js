import {run} from '../../util/run'
import {Router} from "express";
import {valid} from "../../const/validations";
import configure from "trees-items-service";
import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";

const router = Router();

const deleteRoot = configure(() => col(cols.ROOT)).removeItem;
module.exports = router;

router.delete('/api/root/:trunkId/:rootId',
    valid("trunkId"),
    valid("rootId"),
    run(({trunkId, rootId}) => deleteRoot(trunkId, rootId))
);