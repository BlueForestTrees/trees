import {badIdGetManyTrunkSpec, getManyTrunkSpec, getManyTrunkSpec2, getQtTrunkBateauSpec, getQtTrunkGateauSpec, getTrunkBaaSpec, getTrunkGateauSpec, searchTrunkSpec, searchTrunkSpec2, typedSearchTrunkSpec, typedSearchTrunkSpec2} from "../../../spec/trunk/testGetTrunkSpec";
import {init, withTest} from "trees-test/dist/api";
import api from "../../../../src";
import {cols} from "../../../../src/const/collections";
import ENV from "../../../../src/env";

describe('GET Trunks', function () {

    beforeEach(init(api, ENV, cols));

    it('return the asked trees', withTest(getManyTrunkSpec));

    it('return the asked trees 2', withTest(getManyTrunkSpec2));

    it('return 400 since id is bad', withTest(badIdGetManyTrunkSpec));

    it('search by name', withTest(searchTrunkSpec));

    it('search by name 2', withTest(searchTrunkSpec2));

    it('search by type', withTest(typedSearchTrunkSpec));

    it('search by name and type', withTest(typedSearchTrunkSpec2));

    it('get gateau trunk', withTest(getTrunkGateauSpec));

    it('get baa trunk with decimal qt', withTest(getTrunkBaaSpec));

    it('get gateau trunk with qt', withTest(getQtTrunkGateauSpec));

    it('get bateau trunk with qt', withTest(getQtTrunkBateauSpec));

});