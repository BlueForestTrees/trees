import {init, testGet200BodyOk, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/collections"
import {prixImpactEntry} from "../../../database/impactEntries"

describe('GET Impacts entries', function () {

    beforeEach(init(api, ENV, cols))

    it('search impact entry', withTest({
        req: {
            url: "/api/tree/impactEntry?q=IP"
        },
        res: {
            body: [
                {
                    "_id": prixImpactEntry._id,
                    "name": "IPrix",
                    "g": "Coût",
                    "color": prixImpactEntry.color
                }
            ]
        }
    }))

})