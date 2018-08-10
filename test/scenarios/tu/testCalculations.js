import {withIdBqtG, withBqtG, withIdBqt, withId} from "test-api-express-mongo/dist/domain"
import {mergeItemList, mergeTwoItems, quantified, sum} from "../../../src/util/calculations"
import Fraction from "fraction.js"
import chai, {expect} from "chai"

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

    describe('test quantified', function () {
        it('return false', function () {
            quantified([withId("aaaaaaaaaaaaaaaaaaaaaaaa")]).should.be.false
        })
        it('return true', function () {
            quantified([withIdBqtG("aaaaaaaaaaaaaaaaaaaaaaaa", 3, "Mass")]).should.be.true
        })
    })

    it('extract SubitemList', function () {
        const itemList = [
            {
                ...withId("111111111111111111111111"),
                "items": []
            },
            {
                ...withId("333333333333333333333333"),
                "items": [withIdBqt("5a6a03c03e77667641d2d2c9", 10)]
            },
            {
                ...withId("444444444444444444444444"),
                "items": [withIdBqt("5a6a03c03e77667641d2d2c9", 100)]
            }]
        const subItemList = [
            withIdBqt("5a6a03c03e77667641d2d2c9", 10),
            withIdBqt("5a6a03c03e77667641d2d2c9", 100)
        ]
        expect(mergeItemList(itemList)).to.deep.equal(subItemList)
    })

    it('mergeItemList', function () {
        const subItemList = [
            withIdBqt("5a6a03c03e77667641d2d2c9", 10),
            withIdBqt("5a6a03c03e77667641d2d2c9", 100),
            withIdBqt("aaaaaaaaaaaaaaaaaaaaaaaa", 4)
        ]
        const mergedItemList = [
            withIdBqt("5a6a03c03e77667641d2d2c9", 110),
            withIdBqt("aaaaaaaaaaaaaaaaaaaaaaaa", 4)
        ]
    })

    it('opérateurs logiques', function () {
        expect(true^true).to.not.be.true
        expect(false^false).to.not.be.true
        expect(false^true).to.not.be.false
        expect(true^false).to.not.be.false
        expect(654^"Mass").to.not.be.true
        expect(null^"Mass").to.not.be.false
    })

})