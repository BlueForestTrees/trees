import chai from 'chai';
import {quantified} from "../../../main/topService/getTankTopService";
import {withId} from "../../../main/util/query";
import {withIdQuantity} from "../../testPlumbing";

chai.should();

describe('TankTopService', function () {

    describe('quantified', function () {
        it('return false', function () {
            quantified([withId("aaaaaaaaaaaaaaaaaaaaaaaa")]).should.be.false;
        });
        it('return true', function () {
            quantified([withIdQuantity("aaaaaaaaaaaaaaaaaaaaaaaa",3,"kg")]).should.be.true;
        });
    });

});