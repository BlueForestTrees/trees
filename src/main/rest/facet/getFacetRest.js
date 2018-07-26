import {validId, validQt, validUnit} from "../../const/validations";
import {loadFacet, loadQuantifiedFacets} from "../../topService/getFacetTopService";
import {QT, UNIT} from "../../const/paths";

import {run} from '../../util/run'
const router = require('express').Router();

module.exports = router;

router.get('/api/facet/:_id',
    validId,
    run(({_id}) => loadFacet(_id))
);

router.get('/api/facet/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => loadQuantifiedFacets(qt, unit, _id))
);