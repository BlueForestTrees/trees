import {valid} from "../../const/validations";
import {removeLink} from "../../topService/linkTopService";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();

module.exports = router;

router.delete('/api/link/:trunkId/:rootId',
    [
        valid("trunkId"),
        valid("rootId"),
    ],
    run(removeLink)
);