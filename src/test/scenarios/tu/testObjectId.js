import {expect} from 'chai';
import {gateauTrunk} from "../../database/gateau";

describe('addObjects', function () {

    it('seul objectInitialDB doit contenir des mongoID', function () {
        expect(gateauTrunk._id).to.equal("5a6a03c03e77667641d2d2c3");
    });
});