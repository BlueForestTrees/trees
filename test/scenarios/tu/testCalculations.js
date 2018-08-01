import {withIdQuantity, withQuantity} from "api-test/dist/domain"
import {basifyQuantity, mergeItems, quantified, sum, summify} from "../../../src/util/calculations"
import {withId} from "mongo-queries-blueforest"
import Fraction from "fraction.js"
import chai from "chai"

chai.should()

describe('TU Calculations', function () {

    describe('long tests', function () {
        it('multiply', function () {
            (Fraction(1).mul(410.144927536).mul(2.07)).valueOf().should.equal(849);
            (0.23923445 * 3600 * 1000).should.equal(861244.02);

            (Fraction(1, 2).mul(Fraction(1, 2))).valueOf().should.equal(0.25);

            Fraction(0.1).mul(0.2).valueOf().should.equal(0.02);
        })
    })
    describe('sum qt', function () {
        it('10fake + 6otherfake = 16fake', function () {
            mergeItems(withQuantity(10, "fakeunit"), withQuantity(6, "anotherfakeunit")).should.deep.equal(withQuantity(16, "fakeunit"))
        })
    })

    describe('basify quantity', function () {
        it('1.2kg => 1200g', function () {
            basifyQuantity(withQuantity(1.2, "kg"))
                .should.deep.equal(withQuantity(1200, "g"))
        })
        it('1an => 11041920000sec', function () {
            basifyQuantity(withQuantity(1, "an"))
                .should.deep.equal(withQuantity(11041920000, "sec"))
        })
        it('120mg => 0.12g', function () {
            basifyQuantity(withQuantity(120, "mg"))
                .should.deep.equal(withQuantity(0.12, "g"))
        })
        it('1g => 1g', function () {
            basifyQuantity(withQuantity(1, "g"))
                .should.deep.equal(withQuantity(1, "g"))
        })
    })

    describe('sum items', function () {
        it('2 items', function () {
            sum([withQuantity(10, "kg"), withQuantity(7, "kg")])
                .should.deep.equal(withQuantity(17000, "g"))
        })
        it('3 items', function () {
            sum([withQuantity(10, "kg"), withQuantity(7, "kg"), withQuantity(4, "kg")])
                .should.deep.equal(withQuantity(21000, "g"))
        })
        it('polyunit items', function () {
            sum([withQuantity(10, "kg"), withQuantity(7000, "g")])
                .should.deep.equal(withQuantity(17000, "g"))
        })
    })

    describe('summify tank', function () {
        it('[A10g,A5g] => [A15g]', function () {
            summify([withIdQuantity("A", 10, "g"), withIdQuantity("A", 5, "g")])
                .should.be.deep.equal([withIdQuantity("A", 15, "g")])
        })
        it('[A10kg,A5000g] => [A15000g]', function () {
            summify([withIdQuantity("A", 10, "kg"), withIdQuantity("A", 5000, "g")])
                .should.be.deep.equal([withIdQuantity("A", 15000, "g")])
        })
        it('[A10kg,B5000g] => [A10000g,B5000g]', function () {
            summify([withIdQuantity("A", 10, "kg"), withIdQuantity("B", 5000, "g")])
                .should.be.deep.equal([withIdQuantity("A", 10000, "g"), withIdQuantity("B", 5000, "g")])
        })
        it('[A1kg,B5,A500g,B3] => [A1500g,B8g]', function () {

            summify([
                withIdQuantity("A", 1, "kg"),
                withIdQuantity("B", 5, "count"),
                withIdQuantity("A", 500, "g"),
                withIdQuantity("B", 3, "count")

            ]).should.be.deep.equal([
                withIdQuantity("A", 1500, "g"),
                withIdQuantity("B", 8, "count")
            ])
        })
    })

    describe('test quantified', function () {
        it('return false', function () {
            quantified([withId("aaaaaaaaaaaaaaaaaaaaaaaa")]).should.be.false
        })
        it('return true', function () {
            quantified([withIdQuantity("aaaaaaaaaaaaaaaaaaaaaaaa", 3, "kg")]).should.be.true
        })
    })

})