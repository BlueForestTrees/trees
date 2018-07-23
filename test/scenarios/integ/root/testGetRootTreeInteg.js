import {expect} from 'chai';
import {gateauRootTreeSpec, lettreGetRootTreeSpec, lettreNoDaQtGetRootTreeSpec, noRootsTreeSpec, papierAGetRootTreeSpec} from "../../../spec/root/testGetRootTreeSpec";
import {init, request, withTest} from "trees-test/dist/api";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('GET Root', function () {

    beforeEach(init(api, ENV, cols));

    it('return a little tree', withTest(gateauRootTreeSpec));

    it('return the letters tree', withTest(lettreGetRootTreeSpec));

    it('return the papier tree', withTest(papierAGetRootTreeSpec));

    it('return the letters tree with no da quantity', withTest(lettreNoDaQtGetRootTreeSpec));

    it('return null', withTest(noRootsTreeSpec));

});