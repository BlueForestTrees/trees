import {init, testGet200BodyOk, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {prixImpactEntry} from "../../../database/impactEntries"

describe('GET Impacts entries', function () {

    beforeEach(init(api, ENV, cols))

    it('search facet entry', withTest({
        req: {
            url: "/api/impactEntry?q=IP"
        },
        res: {
            body: [
                {
                    "_id": prixImpactEntry._id,
                    "name": "IPrix",
                    "grandeur": "Coût",
                    "color": prixImpactEntry.color
                }
            ]
        }
    }))

})