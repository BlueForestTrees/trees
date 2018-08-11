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
import {authGod} from "../../../database/users"
import {postAdemeImpactEntryFileSpec} from "../../../spec/impactEntry/testPostImpactEntrySpec"
import {postTrunkFileSpec} from "../../../spec/trunk/testPostTrunkSpec"

const postImpactPetitFileSpec = {
    req: {
        url: "/api/impactBulk/ademe",
        headers: authGod,
        method: "POST",
        file: {
            field: "csv.ademe.impact",
            path: path.resolve("test/files/PETIT_BI_1.09__03_Procedes_Impacts.csv")
        }
    },
    res: {
        bodypath: [
            {path: "$.ok", value: 1},
            {path: "$.nInserted", value: 2}
        ]
    }
}

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

    it('post ademe trunk file, resolve fail', withTest({
        ...postImpactPetitFileSpec,
        db: {
            expected: {
                colname: cols.IMPACT,
                doc: {
                    "externId": "81cd479b-6536-40ac-be2a-ab18b6e79bb8",
                    "items": [
                        {
                            "externId": "ec7836be-83eb-41da-bcda-1a6a3fe2d149",
                            "bqt": 4.34245e-05
                        },
                        {
                            "externId": "865c4fbe-11cc-4905-9b0a-80a99d94f7e6",
                            "bqt": 3.73707e-08
                        }
                    ]
                }
            }
        }
    }))

    it('post ademe impacts entries, trunk then impacts', withTest([
        postAdemeImpactEntryFileSpec,
        postTrunkFileSpec,
        postImpactPetitFileSpec
    ]))
})