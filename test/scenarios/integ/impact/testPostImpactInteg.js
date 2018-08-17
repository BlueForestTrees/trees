import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import path from 'path'
import {prixImpactEntry} from "../../../database/impactEntries"
import {farineTrunk} from "../../../database/gateau"
import {withIdBqtG} from "test-api-express-mongo/dist/domain"
import {replaceItem, oneResponse, oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {authGod} from "../../../database/users"
import {postAdemeImpactEntryFileSpec} from "../../../spec/impactEntry/testPostImpactEntrySpec"
import {postTrunkFileSpec} from "../../../spec/trunk/testPostTrunkSpec"
import {object, createObjectId} from "test-api-express-mongo/dist/util"

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
            {path: "$.nInserted", value: 4}
        ]
    }
}

describe('POST Impact', function () {
    
    beforeEach(init(api, ENV, cols))
    
    const impact = {_id: createObjectId(), trunkId: farineTrunk._id, impactId: prixImpactEntry._id, bqt: 4}
    const impact2 = {_id: createObjectId(), trunkId: farineTrunk._id, impactId: prixImpactEntry._id, bqt: 4}
    
    let postImpactReq = impact => ({
        req: {
            url: `/api/impact`,
            method: "POST",
            body: impact
        },
        res: {
            body: oneResponse
        }
    })
    
    it('post new impact', withTest({
        ...postImpactReq(impact),
        db: {
            expected: {
                colname: cols.IMPACT,
                doc: impact
            }
        }
    }))
    
    it('post two impacts', withTest([
        postImpactReq(impact),
        postImpactReq(impact2),
        {
            db: {
                expected: {
                    list: [{
                        colname: cols.IMPACT,
                        doc: impact
                    }, {
                        colname: cols.IMPACT,
                        doc: impact2
                    }]
                }
            }
        }
    ]))
    
    it('post ademe trunk file, resolve fail', withTest({
            ...postImpactPetitFileSpec,
            db: {
                expected: {
                    list: [
                        {
                            colname: cols.IMPACT,
                            doc: {trunkExternId: "81cd479b-6536-40ac-be2a-ab18b6e79bb8", impactExternId: "ec7836be-83eb-41da-bcda-1a6a3fe2d149", bqt: 0.0000434245},
                        },
                        {
                            colname: cols.IMPACT,
                            doc: {trunkExternId: "940bf6ef-aaae-4559-9dd3-0cd68d30b2f4", impactExternId: "865c4fbe-11cc-4905-9b0a-80a99d94f7e6", bqt: 0.000000311443},
                        },
                        {
                            colname: cols.IMPACT,
                            doc: {trunkExternId: "940bf6ef-aaae-4559-9dd3-0cd68d30b2f4", impactExternId: "ec7836be-83eb-41da-bcda-1a6a3fe2d149", bqt: 0.00175113},
                        },
                        {
                            colname: cols.IMPACT,
                            doc: {trunkExternId: "81cd479b-6536-40ac-be2a-ab18b6e79bb8", impactExternId: "865c4fbe-11cc-4905-9b0a-80a99d94f7e6", bqt: 0.0000000373707},
                        }
                    ]
                }
            }
        })
    )
    
    it('post ademe impacts entries, trunk then impacts', withTest([
        postAdemeImpactEntryFileSpec,
        postTrunkFileSpec,
        postImpactPetitFileSpec,
    ]))
})