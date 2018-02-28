import {getAllFacetEntries, getFacetEntryByName, searchFacetEntriesByNamepart} from "../../service/facetEntry/getFacetEntryService";

const run = require('../../util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');

module.exports = router;

router.get('/api/facetEntry',
    [
        check('q').exists()
    ],
    run(({q}) => searchFacetEntriesByNamepart(q))
);

router.get('/api/facetEntry/all',
    run(getAllFacetEntries)
);

router.get('/api/facetEntry/:name',
    run(({name}) => getFacetEntryByName(name))
);