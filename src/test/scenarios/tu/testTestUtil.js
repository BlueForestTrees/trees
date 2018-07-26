import {expect} from 'chai';
import {remove, replaceItem, withTrunk, withTrunkNoQt} from "../../util/testUtil";

describe('TU Utils', function () {

    it('remove ok', function () {
        expect(remove(
            {
                items: [{i: 1}, {i: 2}, {i: 3}]
            },
            "items",
            {i: 2})
        ).to.deep.equal(
            {
                items: [{i: 1}, {i: 3}]
            });
    });

    it('replace ok', function () {
        expect(replaceItem(
            {
                items: [{i: 1}, {i: 3}, {_id: 2, oldVal: 7}]
            },
            "items",
            {_id: 2, newVal: 5})
        ).to.deep.equal(
            {
                items: [{i: 1}, {i: 3}, {_id: 2, newVal: 5}]
            });
    });

    it('withTrunkNoQt ok', function () {
        let t = withTrunkNoQt("Eau", "999903c03e77667641d99994");
        expect(t)
            .to.deep.equal({color: t.color, name: "Eau", name_lower: "eau", _id: "999903c03e77667641d99994"});
    });

    const trunk = withTrunk("Gateau au chocolat", "5a6a03c03e77667641d2d2c3", 200, "g");
    it('withTrunk ok', function () {
        expect(trunk)
            .to.deep.equal({
            color: trunk.color,
            _id: "5a6a03c03e77667641d2d2c3",
            name: "Gateau au chocolat",
            name_lower: "gateau au chocolat",
            quantity: {
                "qt": 200,
                "unit": "g"
            }
        });
    })

});