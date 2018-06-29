import {init, run, withTest} from "../../../util/testIntegApp";
import {badLoginAuthentSpec, badPasswordAuthentSpec, validAuthentSpec} from "../../../spec/auth/postAuthentSpec";
import {existingSuscribeSpec, validSuscribeSpec} from "../../../spec/auth/postSuscribeSpec";

describe('POST Suscribe', function () {

    beforeEach(init);

    it('valid suscribe test', withTest(validSuscribeSpec));

    it('existing login suscribe test', withTest(existingSuscribeSpec));

});