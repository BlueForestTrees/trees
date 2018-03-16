import {app} from "../../../../main";
import {avecUneQtManquanteTankSpec, avecUneQtManquanteTankSpec2, lettreTankSpec, sansTank} from "../../../expected/tank/testGetTankData";
import {run} from "../../../util/testIntegApp";
import {run2} from "../../../util/testIntegApp";import {init, request} from "../../../util/testIntegApp";

const getTank = spec =>
    request()
        .get(`/api/tank/${spec.req.quantity.qt}/${spec.req.quantity.unit}/${spec.req._id}`)
        .then(async (res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
        });


describe('GET Tank', function () {

    beforeEach(init);

    it('lettreTankSpec', run(() => getTank(lettreTankSpec)));

    it('avecUneQtManquanteTankSpec', run2(getTank, avecUneQtManquanteTankSpec));

    it('avecUneQtManquanteTankSpec2', run2(getTank, avecUneQtManquanteTankSpec2));

    it('sansTank', run2(getTank, sansTank));

});

