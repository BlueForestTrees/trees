import {expect} from 'chai';
import {match, mock} from 'sinon';
import {initTools} from "../integ/testIntegPlumbing";
import {initialDB, gateau} from "../integ/testIntegDatabase";
import mongo from 'mongodb';
import {addObjects} from "../../../main/util/addObjectID";
import {cols} from "../../../main/const/collections";

describe('Unit', function () {

    describe('addObjects', function(){
        it('add ObjectID', function(){

            const docs = [{_id:"5a6a03c03e77667641d2d2c0"}];
            const expected = [{_id:new mongo.ObjectID("5a6a03c03e77667641d2d2c0")}];

            addObjects(docs);

            expect(docs).to.deep.equal(expected);
        });
        it('add ObjectID 2', function(){
            expect(initialDB[cols.TRUNK][0]._id).to.deep.equal(new mongo.ObjectID("5a6a03c03e77667641d2d2c0"));
        });

        it('seul objectInitialDB doit contenir des mongoID', function(){
            expect(gateau._id).to.equal("5a6a03c03e77667641d2d2c3");
        });
    });

});