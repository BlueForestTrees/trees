import {expect} from 'chai'

import {badUnitGetRootSpec, emptyGetRootSpec, farineNoBleQtGetRootSpec, gateau1000GGetRootSpec, getBananeRootSpec, getRootsSpec, otherUnitGetRootSpec, sameQtGetRootSpec, skate10GetRootSpec} from "../../../spec/root/testGetRootSpec"
import {run, withTest} from "test-api-express-mongo/dist/api"
import {init, request} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {banane, bananeBC, transport} from "../../../database/banane"

describe('GET Root', function () {

    beforeEach(init(api, ENV, cols))

    it('return banane with roots & relativeTo', withTest({
        req: {
            method: "GET",
            url: `/api/root/1/count/${bananeBC._id}`
        },
        res: {
            bodypath: {path: `$.items[?(@._id==="${transport._id}")].relativeTo`, value: [banane._id]}
        }
    }))

    it('return roots', withTest(getRootsSpec))

    it('return empty roots', withTest(emptyGetRootSpec))

    it('return root with same quantity', withTest(sameQtGetRootSpec))

    it('return root with another quantity', withTest(gateau1000GGetRootSpec))

    it('return an error because unit mismatch', withTest(badUnitGetRootSpec))

    it('return root with another quantity no unit', withTest(skate10GetRootSpec))

    it('return root with another unit', withTest(otherUnitGetRootSpec))

    it('return root even with no qt in roots', withTest(farineNoBleQtGetRootSpec))

})