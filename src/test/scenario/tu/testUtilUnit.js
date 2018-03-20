import {expect} from 'chai';

import {initTools} from "../../util/testIntegApp";
import mongo from 'mongodb';
import {addObjects} from "../../../main/util/addObjectID";
import {cols} from "../../../main/const/collections";
import {gateauTrunk} from "../../database/gateau";
import {initialDB} from "../../util/testIntegDatabase";

describe('TU Unit', function () {

    describe('addObjects', function () {
        it('add ObjectID', function () {

            const docs = [{_id: "5a6a03c03e77667641d2d2c0"}];
            const expected = [{_id: new mongo.ObjectID("5a6a03c03e77667641d2d2c0")}];

            addObjects(docs);

            expect(docs).to.deep.equal(expected);
        });
        it('add ObjectID 2', function () {
            expect(initialDB[cols.TRUNK][0]._id).to.deep.equal(new mongo.ObjectID("6a6a03c03e77667641d2d2c3"));
        });

        it('seul objectInitialDB doit contenir des mongoID', function () {
            expect(gateauTrunk._id).to.equal("5a6a03c03e77667641d2d2c3");
        });
    });


});