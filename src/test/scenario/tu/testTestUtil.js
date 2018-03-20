import {expect} from 'chai';
import {remove, replaceItem} from "../../util/testIntegApp";

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

});