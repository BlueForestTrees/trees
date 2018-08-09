import {withIdBqtG, withBqtG} from "test-api-express-mongo/dist/domain"
import {mergeTwoItems, quantified, sum} from "../../../src/util/calculations"
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
            mergeTwoItems(withBqtG(10, "fakeunit"), withBqtG(6, "anotherfakeunit")).should.deep.equal(withBqtG(16, "fakeunit"))
        })
    })

    describe('sum items', function () {
        it('2 items', function () {
            sum([withBqtG(10000, "Mass"), withBqtG(7000, "Mass")])
                .should.deep.equal(withBqtG(17000, "Mass"))
        })
        it('3 items', function () {
            sum([withBqtG(10000, "Mass"), withBqtG(7000, "Mass"), withBqtG(4000, "Mass")])
                .should.deep.equal(withBqtG(21000, "Mass"))
        })
    })

    describe('summify tank', function () {
        it('[A10g,A5g] => [A15Mass]', function () {
            mergeTwoItems([withIdBqtG("A", 10, "Mass"), withIdBqtG("A", 5, "Mass")])
                .should.be.deep.equal([withIdBqtG("A", 15, "Mass")])
        })
        it('[A1Mass,B5,A500Mass,B3] => [A1500g,B8g]', function () {

            mergeTwoItems([
                withIdBqtG("A", 1000, "Mass"),
                withIdBqtG("B", 5, "Nomb"),
                withIdBqtG("A", 500, "g"),
                withIdBqtG("B", 3, "Mass")

            ]).should.be.deep.equal([
                withIdBqtG("A", 1500, "Mass"),
                withIdBqtG("B", 8, "Nomb")
            ])
        })
    })

    describe('test quantified', function () {
        it('return false', function () {
            quantified([withId("aaaaaaaaaaaaaaaaaaaaaaaa")]).should.be.false
        })
        it('return true', function () {
            quantified([withIdBqtG("aaaaaaaaaaaaaaaaaaaaaaaa", 3, "Mass")]).should.be.true
        })
    })

})