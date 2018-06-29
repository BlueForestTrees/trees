import {init, run, withTest} from "../../../util/testIntegApp";
import {badLoginAuthentSpec, badPasswordAuthentSpec, validAuthentSpec} from "../../../spec/auth/postAuthentSpec";
import {existingSuscribeSpec, loginNewUserSpec, validSuscribeSpec} from "../../../spec/auth/postSuscribeSpec";
import {cols} from "../../../../main/const/collections";

describe('POST Suscribe Authent', function () {

    beforeEach(init);

    it('valid suscribe authent test', withTest([validSuscribeSpec, loginNewUserSpec]));

});