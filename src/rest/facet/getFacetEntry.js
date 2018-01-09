const facets = require("../../service/facets");
const run = require('../../util/run');
const router = require('express').Router();
const {check} = require('express-validator/check');

module.exports = router;

router.get('/api/facetEntries',
    [
        check('q').exists().isLength({min:3})
    ],
    run(({q}) => facets.search(q))
);

router.get('/api/facetEntries/all',
    run(facets.listall)
);

router.get('/api/facetEntry/:name',
    run(({name}) => facets.get(name))
);
