import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import path from 'path'
import {prixImpactEntry, vitBImpactEntry} from "../../../database/impactEntries"
import {bleImpacts, farineTrunk} from "../../../database/gateau"
import {withIdBqtG} from "test-api-express-mongo/dist/domain"
import {replaceItem, oneModifiedResponse} from "test-api-express-mongo/dist/domain"


describe('POST Impact', function () {

    beforeEach(init(api, ENV, cols))

    it('create impacts to farine', withTest({
        req: {
            url: `/api/impact`,
            method: "POST",
            body: {
                trunk: withIdBqtG(farineTrunk._id, 45, "Surf"),
                impact: withIdBqtG(prixImpactEntry._id, 144, "Surf")
            }
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.IMPACT,
                doc: {
                    ...withIdBqtG(farineTrunk._id, 45, "Surf"),
                    items: [
                        withIdBqtG(prixImpactEntry._id, 144, "Surf")
                    ],
                }
            }
        }
    }))

    it('adding impact to ble', withTest({
        req: {
            url: `/api/impact`,
            method: "POST",
            body: {
                trunk: withIdBqtG(bleImpacts._id, 10000, "Mass"),
                impact: withIdBqtG(prixImpactEntry._id, 144, "Surf")
            }
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.IMPACT,
                doc: {
                    ...withIdBqtG(bleImpacts._id, 10000, "Mass"),
                    items: [
                        ...bleImpacts.items,
                        withIdBqtG(prixImpactEntry._id, 144, "Surf")
                    ],

                }
            }
        }
    }))

    it('adding impact to ble different trunk qt', withTest({
        req: {
            url: `/api/impact`,
            method: "POST",
            body: {
                trunk: withIdBqtG(bleImpacts._id, 5000, "Mass"),
                impact: withIdBqtG(prixImpactEntry._id, 144, "Surf")
            }
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.IMPACT,
                doc: {
                    ...withIdBqtG(bleImpacts._id, 10000, "Mass"),
                    items: [
                        ...bleImpacts.items,
                        withIdBqtG(prixImpactEntry._id, 288, "Surf")
                    ],

                }
            }
        }
    }))

    it('update impact of ble', withTest({
        req: {
            url: `/api/impact`,
            method: "POST",
            body: {
                trunk: withIdBqtG(bleImpacts._id, 5000, "Mass"),
                impact: withIdBqtG(vitBImpactEntry._id, 0.02, "Dens")
            }
        },
        res: {
            body: oneModifiedResponse
        },
        db: {
            expected: {
                colname: cols.IMPACT,
                doc: replaceItem(bleImpacts, "items", withIdBqtG(vitBImpactEntry._id, 0.04, "Dens"))
            }
        }
    }))

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