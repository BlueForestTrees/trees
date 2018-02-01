import {expect} from 'chai';
import {match, mock} from 'sinon';
import {GrandeurMismatchError, NoUnitError} from "../../../main/exceptions/Errors";
import {qtUnitCoef, unit, unitCoef} from "../../../main/service/grandeursService";

describe('Grandeurs', function () {


    describe('unit', function(){
        it('m ok', function(){
            expect(unitCoef('m','m')).to.equal(1);
        });
        it('"" ok', function(){
            expect(unitCoef('','')).to.equal(1);
        });
        it('doudou throws error', function(){
           expect(()=>unit('doudou')).to.throw(NoUnitError);
        });
    });

    describe('unitCoef', function(){
        it('m m == 1', function(){
            expect(unitCoef('m','m')).to.equal(1);
        });
        it('km km == 1', function(){
            expect(unitCoef('km','km')).to.equal(1);
        });
        it('km m == 1000', function(){
            expect(unitCoef('km','m')).to.equal(1000);
        });
        it('m km == 0.001', function(){
            expect(unitCoef('m','km')).to.equal(0.001);
        });
        it('sec km throws GrandeurMismatchError', function(){
            expect(()=>unitCoef('sec','km')).to.throw(GrandeurMismatchError);
        });
    });

    describe('qtUnitCoef', function () {
        it('1kg 1kg == 1', function () {
            expect(qtUnitCoef({qt:1,unit:"kg"},{qt:1,unit:"kg"})).to.equal(1);
        });

        it('2kg 1kg == 2', function () {
            expect(qtUnitCoef({qt:2,unit:"kg"},{qt:1,unit:"kg"})).to.equal(2);
        });
        it('2kg 4kg == 0.5', function () {
            expect(qtUnitCoef({qt:2,unit:"kg"},{qt:4,unit:"kg"})).to.equal(0.5);
        });

        it('1000g 1kg == 1', function () {
            expect(qtUnitCoef({qt:1000,unit:"g"},{qt:1,unit:"kg"})).to.equal(1);
        });
        it('1kg 1000g == 1', function () {
            expect(qtUnitCoef({qt:1,unit:"kg"},{qt:1000,unit:"g"})).to.equal(1);
        });

        it('1g 1kg == 0.001', function () {
            expect(qtUnitCoef({qt:1,unit:"g"},{qt:1,unit:"kg"})).to.equal(0.001);
        });
        it('1kg 1g == 1000', function () {
            expect(qtUnitCoef({qt:1,unit:"kg"},{qt:1,unit:"g"})).to.equal(1000);
        });

    });

});