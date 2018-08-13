import {assertDb} from "test-api-express-mongo/dist/db"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleImpacts, bleTrunk} from "../../../database/gateau"
import {zeroDeletionOk, oneDeletionOk, twoDeletionOk} from "test-api-express-mongo/dist/domain"

describe('DELETE Impact', function () {

    beforeEach(init(api, ENV, cols))

    it('delete all impacts of a trunk', withTest({
        req: {
            url: `/api/impact/${bleImpacts[0].trunkId}`,
            method: "DELETE"
        },
        res: {
            body: twoDeletionOk
        },
        db: {
            expected: {
                colname: cols.IMPACT,
                missingDoc: {
                    trunkId: bleTrunk._id
                }
            }
        }
    }))

    it('delete one impact of a trunk', withTest({
        req: {
            url: `/api/impact/${bleImpacts[0].trunkId}/${bleImpacts[0].impactId}`,
            method: "DELETE"
        },
        res: {
            body: oneDeletionOk
        },
        db: {
            expected: {
                list: [
                    {
                        colname: cols.IMPACT,
                        missingDoc: {
                            trunkId: bleImpacts[0].trunkId,
                            impactId: bleImpacts[0].impactId
                        }
                    },
                    {
                        colname: cols.IMPACT,
                        doc: {
                            trunkId: bleImpacts[1].trunkId,
                            impactId: bleImpacts[1].impactId
                        }
                    },
                ]
            }
        }
    }))

    it('delete non existing impact of a trunk', withTest([
        {
            req: {
                url: `/api/impact/${bleImpacts[0].trunkId}`,
                method: "DELETE"
            },
            res: {
                expected: {body: twoDeletionOk}
            }
        },
        {
            req: {
                url: `/api/impact/${bleImpacts[0].trunkId}`,
                method: "DELETE"
            },
            res: {
                body: zeroDeletionOk
            }
        }
    ]))

})