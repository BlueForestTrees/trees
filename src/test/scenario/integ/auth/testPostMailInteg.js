import {init, run, withTest} from "../../../util/testIntegApp";
import {badLoginAuthentSpec, badPasswordAuthentSpec, validAuthentSpec} from "../../../spec/auth/postAuthentSpec";
import {existingPostMailSpec, invalidPostMailSpec, validPostMailSpec} from "../../../spec/auth/postMailSpec";

describe('POST Mail', function () {

    beforeEach(init);

    it('valid mail test', withTest(validPostMailSpec));

    it('existing mail test', withTest(existingPostMailSpec));

    it('invalid mail test', withTest(invalidPostMailSpec));

});