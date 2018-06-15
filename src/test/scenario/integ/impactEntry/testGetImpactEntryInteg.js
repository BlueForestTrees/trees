import {app} from "../../../../main";
import {init, testGet200BodyOk} from "../../../util/testIntegApp";
import {getImpactEntrySpec} from "../../../spec/impactEntry/testGetImpactEntrySpec";

describe('GET Impacts entries', function () {

    beforeEach(init);

    it('return impact entries', done => testGet200BodyOk(`/api/impactEntry?q=${getImpactEntrySpec.req.term}`, getImpactEntrySpec, done));

});