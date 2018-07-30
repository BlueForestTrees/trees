import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {avecUneQtManquanteTankSpec, avecUneQtManquanteTankSpec2, lettreTankSpec, linkAToSkateThenTank, sansTank} from "../../../spec/tank/testGetTankSpec"
import {init, withTest} from "trees-test/dist/api"

describe('GET Tank', function () {

    beforeEach(init(api, ENV, cols))

    it('get lettre tank', withTest(lettreTankSpec))

    it('get lettre tank avec une qt manquante', withTest(avecUneQtManquanteTankSpec))

    it('get lettre tank avec une qt manquante 2', withTest(avecUneQtManquanteTankSpec2))

    it('get lettre sans tank', withTest(sansTank))

    it('link a to skate then tank', withTest(linkAToSkateThenTank))

})

