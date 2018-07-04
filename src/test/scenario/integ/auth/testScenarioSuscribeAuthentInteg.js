import {init, withTest} from "../../../util/testIntegApp";
import {loginNewUserSpec, validSuscribeSpec} from "../../../spec/auth/postSuscribeSpec";

describe('POST Suscribe then Authent', function () {

    beforeEach(init);

    it('Suscribe then Authent .valid', withTest([validSuscribeSpec, loginNewUserSpec]));

});