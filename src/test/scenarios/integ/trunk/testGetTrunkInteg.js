import {getQtTrunkBateauSpec, getQtTrunkGateauSpec, getTrunkBaaSpec, getTrunkGateauSpec, searchTrunkSpec, searchTrunkSpec2, typedSearchTrunkSpec, typedSearchTrunkSpec2} from "../../../spec/trunk/testGetTrunkSpec";
import {app} from "../../../../main";
import {init, withTest} from "../../../util/testIntegApp";

describe('GET Trunks', function () {

    beforeEach(init);

    it('search by name', withTest(searchTrunkSpec));

    it('search by name 2', withTest(searchTrunkSpec2));

    it('search by type', withTest(typedSearchTrunkSpec));

    it('search by name and type', withTest(typedSearchTrunkSpec2));

    it('get gateau trunk', withTest(getTrunkGateauSpec));

    it('get baa trunk with decimal qt', withTest(getTrunkBaaSpec));

    it('get gateau trunk with qt', withTest(getQtTrunkGateauSpec));

    it('get bateau trunk with qt', withTest(getQtTrunkBateauSpec));

});