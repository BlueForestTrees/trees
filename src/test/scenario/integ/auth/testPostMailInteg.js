import {init, withTest} from "../../../util/testIntegApp";
import {existingPostMailSpec, invalidPostMailSpec, validPostMailSpec} from "../../../spec/auth/postMailSpec";

describe('POST Mail', function () {

    beforeEach(init);

    it('valid mail test', withTest(validPostMailSpec));

    it('existing mail test', withTest(existingPostMailSpec));

    it('invalid mail test', withTest(invalidPostMailSpec));

});