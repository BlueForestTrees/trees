import {expect} from 'chai';
import {match, mock} from 'sinon';
import {coef, qtUnitCoef, toBaseQuantity, unit, unitCoef} from "../../../main/service/grandeur/grandeursService";

describe('Grandeurs', function () {


    describe('unit', function () {
        it('m ok', function () {
            expect(unitCoef('m', 'm')).to.equal(1);
        });
        it('"" ok', function () {
            expect(unitCoef('count', 'count')).to.equal(1);
        });
        it('unit("doudou") throws error', function () {
            expect(unit('doudou')).to.be.null;
        });
    });

    describe('unitCoef', function () {
        it('m m == 1', function () {
            expect(unitCoef('m', 'm')).to.equal(1);
        });
        it('km km == 1', function () {
            expect(unitCoef('km', 'km')).to.equal(1);
        });
        it('km m == 1000', function () {
            expect(unitCoef('km', 'm')).to.equal(1000);
        });
        it('m km == 0.001', function () {
            expect(unitCoef('m', 'km')).to.equal(0.001);
        });
        it('sec km is undefined', function () {
            expect(unitCoef('sec', 'km')).to.equal(undefined);
        });
    });

    describe('qtUnitCoef', function () {
        it('1kg 1kg == 1', function () {
            expect(qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1, unit: "kg"})).to.equal(1);
        });

        it('2kg 1kg == 2', function () {
            expect(qtUnitCoef({qt: 2, unit: "kg"}, {qt: 1, unit: "kg"})).to.equal(2);
        });
        it('2kg 4kg == 0.5', function () {
            expect(qtUnitCoef({qt: 2, unit: "kg"}, {qt: 4, unit: "kg"})).to.equal(0.5);
        });

        it('1000g 1kg == 1', function () {
            expect(qtUnitCoef({qt: 1000, unit: "g"}, {qt: 1, unit: "kg"})).to.equal(1);
        });
        it('1kg 1000g == 1', function () {
            expect(qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1000, unit: "g"})).to.equal(1);
        });

        it('1g 1kg == 0.001', function () {
            expect(qtUnitCoef({qt: 1, unit: "g"}, {qt: 1, unit: "kg"})).to.equal(0.001);
        });
        it('1kg 1g == 1000', function () {
            expect(qtUnitCoef({qt: 1, unit: "kg"}, {qt: 1, unit: "g"})).to.equal(1000);
        });

    });

    describe('coef', function () {
        it('kg => 1000', function () {
            expect(coef("kg")).to.equal(1000);
        });
        it('g => 1', function () {
            expect(coef("g")).to.equal(1);
        });
        it('"count" => 1', function () {
            expect(coef("count")).to.equal(1);
        });
    });

    describe('baseQt', function () {
        it('10kg => 10000g', function () {
            expect(toBaseQuantity({qt: 10, unit: "kg"})).to.deep.equal({qt: 10000, unit: "g"});
        });
        it('10.5kg => 10500g', function () {
            expect(toBaseQuantity({qt: 10, unit: "kg"})).to.deep.equal({qt: 10000, unit: "g"});
        });
        it('10g => 10g', function () {
            expect(toBaseQuantity({qt: 10, unit: "g"})).to.deep.equal({qt: 10, unit: "g"});
        });
    });


});