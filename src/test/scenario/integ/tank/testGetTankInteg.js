import chai from 'chai';
import {app} from "../../../../main";
import {avecUneQtManquanteTankSpec, lettreTankSpec} from "../../../expected/tank/testGetTankData";
import {run} from "../../../testIntegPlumbing";
import {initDatabase, run2} from "../../../testIntegDatabase";

const getTank = spec => {
    return chai.request(app)
        .get(`/api/tank/${spec.req.quantity.qt}${spec.req.quantity.unit ? '/' + spec.req.quantity.unit : ''}/${spec.req._id}`)
        .then(async (res) => {
            res.should.have.status(200);
            res.body.should.deep.equal(spec.res.body);
        });
};

describe('GET Tank', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('lettreTankSpec', run(() => getTank(lettreTankSpec)));

    it('avecUneQtManquanteTankSpec', run2(getTank, avecUneQtManquanteTankSpec));

});

