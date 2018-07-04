import {init, run, withTest} from "../../../util/testIntegApp";
import {existingSuscribeSpec, validSuscribeSpec} from "../../../spec/auth/postSuscribeSpec";

describe('POST Suscribe', function () {

    beforeEach(init);

    it('Suscribe test .OK', withTest(validSuscribeSpec));

    it('Suscribe test .existing login', withTest(existingSuscribeSpec));

});