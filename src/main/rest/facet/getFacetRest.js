import {existingId} from "../../const/validations";
import {loadFacets} from "../../topService/getFacetTopService";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.get('/api/facet/:_id',
    [
        existingId
    ],
    run(({_id}) => loadFacets(_id))
);