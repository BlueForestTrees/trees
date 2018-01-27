import {expect} from 'chai';
import {match, mock} from 'sinon';
import {initTools} from "../../common/index";
import {objectInitialDB, topTrunkQt} from "../../data/database";
import {addObjects} from "../../../src/util/addObjectID";
import {cols} from "../../../src/const/collections";
import mongo from 'mongodb';

describe('Unit', function () {

    describe('addObjects', function(){
        it('add ObjectID', function(){

            const docs = [{_id:"5a6a03c03e77667641d2d2c0"}];
            const expected = [{_id:new mongo.ObjectID("5a6a03c03e77667641d2d2c0")}];

            addObjects(docs);

            expect(docs).to.deep.equal(expected);
        });
        it('add ObjectID 2', function(){
            expect(objectInitialDB[cols.TRUNK][0]._id).to.deep.equal(new mongo.ObjectID("5a6a03c03e77667641d2d2c0"));
        });

        it('seul objectInitialDB doit contenir des mongoID', function(){
            expect(topTrunkQt._id).to.equal("5a6a03c03e77667641d2d2c3");
        });
    });

});