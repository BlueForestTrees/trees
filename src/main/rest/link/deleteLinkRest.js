import {valid} from "../../const/validations";
import {removeLink} from "../../topService/linkTopService";
import {run} from '../../util/run'

import express from "trees-express";

const router = express.Router();

module.exports = router;

router.delete('/api/link/:trunkId/:rootId',
    valid("trunkId"),
    valid("rootId"),
    run(removeLink)
);