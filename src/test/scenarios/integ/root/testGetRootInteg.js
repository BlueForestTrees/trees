import {expect} from 'chai';
import {app} from "../../../../main";
import {badUnitGetRootSpec, emptyGetRootSpec, farineNoBleQtGetRootSpec, gateau1000GGetRootSpec, getBananeRootSpec, getRootsSpec, otherUnitGetRootSpec, sameQtGetRootSpec, skate10GetRootSpec} from "../../../spec/root/testGetRootSpec";
import {run, withTest} from "../../../util/testIntegApp";
import {init, request} from "../../../util/testIntegApp";

describe('GET Root', function () {

    beforeEach(init);

    it('return banane with roots & relativeTo', withTest(getBananeRootSpec));

    it('return roots', withTest(getRootsSpec));

    it('return empty roots', withTest(emptyGetRootSpec));

    it('return root with same quantity', withTest(sameQtGetRootSpec));

    it('return root with another quantity', withTest(gateau1000GGetRootSpec));

    it('return an error because unit mismatch', withTest(badUnitGetRootSpec));

    it('return root with another quantity no unit', withTest(skate10GetRootSpec));

    it('return root with another unit', withTest(otherUnitGetRootSpec));

    it('return root even with no qt in roots', withTest(farineNoBleQtGetRootSpec));

});