import {valid} from "../../const/validations";
import {removeRoot} from "../../service/root/rootCommands";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();

module.exports = router;

router.delete('/api/root/:trunkId/:rootId',
    [
        valid("trunkId"),
        valid("rootId"),
    ],
    run(removeRoot)
);