import {bleAddingImpactSpec, bleAddingImpactSpec2, bleUpdatingImpactSpec, farineCreatingImpactSpec} from "../../../spec/impact/testPostImpactSpec"
import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST Impact', function () {

    beforeEach(init(api, ENV, cols))

    it('create impacts to farine', withTest(farineCreatingImpactSpec))
    it('adding impact to ble', withTest(bleAddingImpactSpec))
    it('adding impact to ble different trunk qt', withTest(bleAddingImpactSpec2))
    it('update impact of ble', withTest(bleUpdatingImpactSpec))
})