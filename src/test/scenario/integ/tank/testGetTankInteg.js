import {app} from "../../../../main";
import {avecUneQtManquanteTankSpec, avecUneQtManquanteTankSpec2, lettreTankSpec, sansTank} from "../../../spec/tank/testGetTankSpec";
import {init, withTest} from "../../../util/testIntegApp";

describe('GET Tank', function () {

    beforeEach(init);

    it('lettreTankSpec', withTest(lettreTankSpec));

    it('avecUneQtManquanteTankSpec', withTest(avecUneQtManquanteTankSpec));

    it('avecUneQtManquanteTankSpec2', withTest(avecUneQtManquanteTankSpec2));

    it('sansTank', withTest(sansTank));

});

