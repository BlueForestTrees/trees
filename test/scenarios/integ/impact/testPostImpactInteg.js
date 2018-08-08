import {bleAddingImpactSpec, bleAddingImpactSpec2, bleUpdatingImpactSpec, farineCreatingImpactSpec, postAdemeImpactFileSpec} from "../../../spec/impact/testPostImpactSpec"
import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import path from 'path'
import {prixImpactEntry} from "../../../database/impactEntries"
import {bleImpacts} from "../../../database/gateau"
import {withIdQuantity} from "test-api-express-mongo/dist/domain"
import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"

describe('POST Impact', function () {

    beforeEach(init(api, ENV, cols))

    it('create impacts to farine', withTest(farineCreatingImpactSpec))

    it('adding impact to ble', withTest({
        req: {
            url: `/api/impact`,
            method: "POST",
            body: {
                trunk: withIdQuantity(bleImpacts._id, 10, "kg"),
                impact: withIdQuantity(prixImpactEntry._id, 144, "m2")
            }
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.IMPACT,
                doc: {
                    ...withIdQuantity(bleImpacts._id, 10, "kg"),
                    items: [
                        ...bleImpacts.items,
                        withIdQuantity(prixImpactEntry._id, 144, "m2")
                    ],

                }
            }
        }
    }))

    it('adding impact to ble different trunk qt', withTest(bleAddingImpactSpec2))
    it('update impact of ble', withTest(bleUpdatingImpactSpec))

    it('post ademe trunk file', withTest({
        req: {
            url: "/api/impactBulk/ademe",
            method: "POST",
            file: {
                field: "csv.ademe.impact",
                path: path.resolve("test/files/PETIT_BI_1.09__03_Procedes_Impacts.csv")
            }
        },
        res: {
            bodypath: [
                {path: "$.ok", value: [true]},
                {path: "$.upsertions", value: [28]},
                {path: "$.insertions", value: [0]},
            ]
        }
    }))
})