import {valid} from "../../const/validations";
import {removeLink} from "../../topService/linkTopService";
import {run} from 'trees-express'

import {Router} from "trees-express";

const router = Router();

module.exports = router;

router.delete('/api/link/:trunkId/:rootId',
    valid("trunkId"),
    valid("rootId"),
    run(removeLink)
);