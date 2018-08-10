import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {init, withTest} from "test-api-express-mongo/dist/api"
import {laitTrunk} from "../../../database/gateau"
import {aTrunk, daTrunk, dbTrunk, dRoot, e1Trunk, e2Trunk} from "../../../database/lettres"
import {withIdBqt, withId, withoutItemQuantity} from "test-api-express-mongo/dist/domain"
import {arbreTrunk, eauTrunk, elecTrunk, skateTrunk} from "../../../database/skate"

describe('GET Tank', function () {

    beforeEach(init(api, ENV, cols))

    it('get lettre tank', withTest({
        req: {
            url: `/api/tank/${aTrunk._id}`
        },
        res: {
            body: [
                    withIdBqt(e2Trunk._id, 20002100),
                    withIdBqt(e1Trunk._id, 510)
                ]
        }
    }))

    it('get lettre tank avec une qt manquante', withTest({
        req: {
            url: `/api/tank/${aTrunk._id}`
        },
        db: {
            preChange: {
                colname: cols.ROOT,
                doc: {
                    ...withoutItemQuantity(dRoot, daTrunk._id)
                }
            }
        },
        res: {
            body: [
                    withIdBqt(e2Trunk._id, 20001100),
                    withId(daTrunk._id),
                    withIdBqt(e1Trunk._id, 510)
                ]
        }
    }))

    it('get lettre tank avec une qt manquante 2', withTest({
        req: {
            url: `/api/tank/${aTrunk._id}`
        },
        db: {
            preChange: {
                colname: cols.ROOT,
                doc: {
                    ...withoutItemQuantity(dRoot, dbTrunk._id)
                }
            }
        },
        res: {
            body: [
                    withIdBqt(e2Trunk._id, 2100),
                    withId(dbTrunk._id),
                    withIdBqt(e1Trunk._id, 510)
                ]
        }
    }))

    it('get lettre sans tank', withTest({
        req: {
            url: `/api/tank/${laitTrunk._id}`
        },
        res: {
            body: []
        }
    }))

    it('link a to skate then tank', withTest([
        {
            req: {
                method: "PUT",
                url: "/api/link",
                body: {
                    trunk: {_id: skateTrunk._id},
                    root: withIdBqt(aTrunk._id, 1000)
                }
            }
        },
        {
            req: {
                url: `/api/tank/${skateTrunk._id}`
            },
            res: {
                body: [
                        withIdBqt(eauTrunk._id, 0.01006),
                        withIdBqt(elecTrunk._id, 86813397.216),
                        withIdBqt(arbreTrunk._id, 0.005),
                        withIdBqt(e2Trunk._id, 5000),
                        withIdBqt(e1Trunk._id, 510)
                    ]
            }
        }
    ]))

})

