import {match, mock} from 'sinon';
import chai from 'chai';
import {basifyQuantity, sum, summify, sumQt} from "../../../main/topService/getTankTopService";
import {withIdQuantity, withQuantity} from "../integ/testIntegDatabase";

chai.should();

describe('Tank', function () {

    describe('sum qt', function () {
        it('10fake + 6otherfake = 16fake', function () {
            sumQt(withQuantity(10, "fakeunit"), withQuantity(6, "anotherfakeunit")).should.deep.equal(withQuantity(16, "fakeunit"));
        });
    });

    describe('basify quantity', function () {
        it('1.2kg => 1200g', function () {
            basifyQuantity(withQuantity(1.2, "kg"))
                .should.deep.equal(withQuantity(1200, "g"));
        });
        it('1an => 11041920000sec', function () {
            basifyQuantity(withQuantity(1, "an"))
                .should.deep.equal(withQuantity(11041920000, "sec"));
        });
        it('120mg => 0.12g', function () {
            basifyQuantity(withQuantity(120, "mg"))
                .should.deep.equal(withQuantity(0.12, "g"));
        });
        it('1g => 1g', function () {
            basifyQuantity(withQuantity(1, "g"))
                .should.deep.equal(withQuantity(1, "g"));
        });
    });

    describe('sum items', function () {
        it('2 items', function () {
            sum([withQuantity(10, "kg"), withQuantity(7, "kg")])
                .should.deep.equal(withQuantity(17000, "g"));
        });
        it('3 items', function () {
            sum([withQuantity(10, "kg"), withQuantity(7, "kg"), withQuantity(4, "kg")])
                .should.deep.equal(withQuantity(21000, "g"));
        });
        it('polyunit items', function () {
            sum([withQuantity(10, "kg"), withQuantity(7000, "g")])
                .should.deep.equal(withQuantity(17000, "g"));
        });
    });

    describe('summify tank', function () {
        it('[A10g,A5g] => [A15g]', function () {
            summify([withIdQuantity("A", 10, "g"), withIdQuantity("A", 5, "g")])
                .should.be.deep.equal([withIdQuantity("A", 15, "g")]);
        });
        it('[A10kg,A5000g] => [A15000g]', function () {
            summify([withIdQuantity("A", 10, "kg"), withIdQuantity("A", 5000, "g")])
                .should.be.deep.equal([withIdQuantity("A", 15000, "g")]);
        });
        it('[A10kg,B5000g] => [A10000g,B5000g]', function () {
            summify([withIdQuantity("A", 10, "kg"), withIdQuantity("B", 5000, "g")])
                .should.be.deep.equal([withIdQuantity("A", 10000, "g"), withIdQuantity("B", 5000, "g")]);
        });
        it('[A1kg,B5,A500g,B3] => [A1500g,B8g]', function () {

            summify([
                withIdQuantity("A", 1, "kg"),
                withIdQuantity("B", 5, ""),
                withIdQuantity("A", 500, "g"),
                withIdQuantity("B", 3, "")

            ]).should.be.deep.equal([
                withIdQuantity("A", 1500, "g"),
                withIdQuantity("B", 8, "")
            ]);
        });
    });

});