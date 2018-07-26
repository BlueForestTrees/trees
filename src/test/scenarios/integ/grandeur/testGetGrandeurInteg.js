import {init, request, withTest} from "../../../util/testIntegApp";
import {getGrandeurSpec} from "../../../spec/grandeur/testGetGrandeurSpec";

describe('GET Grandeurs', function () {

    beforeEach(init);

    it('return grandeurs', withTest(getGrandeurSpec));

});