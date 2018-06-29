import {init, run, withTest} from "../../../util/testIntegApp";
import {badLoginAuthentSpec, badPasswordAuthentSpec, validAuthentSpec} from "../../../spec/auth/postAuthentSpec";

describe('POST Authent', function () {

    beforeEach(init);

    it('valid authent test', withTest(validAuthentSpec));

    it('bad password authent test', withTest(badPasswordAuthentSpec));

    it('bad login authent test', withTest(badLoginAuthentSpec));

});