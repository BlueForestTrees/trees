import {withIdBqtG, withBqtG, withIdBqt, withId} from "test-api-express-mongo"
import {mergeItemList, mergeTwoItems, sum} from "../../../src/util/calculations"
import chai, {expect} from "chai"

chai.should()

describe('TU Calculations', function () {

    describe('sum qt', function () {
        it('mergeTwoItems', function () {
            mergeTwoItems({bqt: 7, any: "rr"}, {bqt: 7, any: "rr"}).should.deep.equal({bqt: 14, any: "rr"})
        })
    })

    describe('sum items', function () {
        it('2 items', function () {
            sum([{bqt: 10000}, {bqt: 7000}])
                .should.deep.equal({bqt: 17000})
        })
        it('3 items', function () {
            sum([{bqt: 10000}, {bqt: 7000}, {bqt: 10000}, {bqt: 7000}])
                .should.deep.equal({bqt: 34000})
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
            withIdBqt("aaaaaaaaaaaaaaaaaabbaaaa", 4)
        ]
        const mergedItemList = [
            withIdBqt("5a6a03c03e77667641d2d2c9", 110),
            withIdBqt("aaaaaaaaaaaaaaaaaabbaaaa", 4)
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
    
    it('test &', function(){
        expect(false & false).to.not.be.true
        expect(false & true).to.not.be.false
        expect(true & false).to.not.be.false
        expect(true & true).to.not.be.true
    })

})