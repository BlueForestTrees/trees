import {emptyGetImpactSpec, emptyQuantifiedGetImpactSpec, getImpactSpec, getQuantifiedImpactSpec} from "../../../spec/impact/testGetImpactSpec";
import {app} from "../../../../main";
import {init, request, withTest} from "../../../util/testIntegApp";

describe('GET Impacts', function () {

    beforeEach(init);

    it('unquantified impacts', withTest(getImpactSpec));
    it('quantified impacts', withTest(getQuantifiedImpactSpec));
    it('unquantified empty impacts', withTest(emptyGetImpactSpec));
    it('quantified empty impacts', withTest(emptyQuantifiedGetImpactSpec));

});