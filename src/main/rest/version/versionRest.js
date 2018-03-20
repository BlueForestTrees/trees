import {run} from '../../util/run'
import ENV from "../../../env";

const router = require('express').Router();
module.exports = router;

const version = {version: ENV.VERSION};

router.get('/api/version', run(() => version)
);