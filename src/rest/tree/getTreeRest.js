import {existingId, presentQt, presentUnit} from "../../const/validations";
import {loadTree} from "../../topService/tree/getTreeService";
import {QT, UNIT} from "../../const/paths";

const run = require('../../util/run');
const router = require('express').Router();

module.exports = router;

router.get('/api/tree/:_id',
    [
        existingId
    ],
    run(({_id}) => loadTree(_id))
);

router.get('/api/tree/:qt/:unit/:_id',
    [
        existingId,
        presentUnit(UNIT),
        presentQt(QT)
    ],
    run(({_id, qt}) => loadTree(_id, qt))
);