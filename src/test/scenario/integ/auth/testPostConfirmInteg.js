import {init, run, withTest} from "../../../util/testIntegApp";
import {badLoginAuthentSpec, badPasswordAuthentSpec, validAuthentSpec} from "../../../spec/auth/postAuthentSpec";
import {validConfirmSpec} from "../../../spec/auth/postConfirmSpec";

describe('POST Login', function () {

    beforeEach(init);

    it('valid confirm test', withTest(validConfirmSpec));


});