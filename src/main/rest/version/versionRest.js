import {run} from '../../util/run'
import ENV from "../../../env";

const router = require('express').Router();
module.exports = router;

router.get('/api/version', run(() => ({version: ENV.VERSION})));