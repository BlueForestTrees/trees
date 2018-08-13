import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {banane, bananeBC, bananeBCRoots, transport} from "../../../database/banane"

describe('GET Root', function () {

    beforeEach(init(api, ENV, cols))

    it('return roots with relativeTo', withTest({
        req: {
            method: "GET",
            url: `/api/root/${bananeBC._id}`
        },
        res: {
            bodypath: [
                {path: `$[?(@._id==="${bananeBCRoots[0]._id}")].quantity.g`, value: [banane.quantity.g]},
                {path: `$[?(@._id==="${bananeBCRoots[1]._id}")].name`, value: [transport.name]},
                {path: `$[?(@._id==="${bananeBCRoots[1]._id}")].color`, value: [transport.color]},
                {path: `$[?(@._id==="${bananeBCRoots[1]._id}")].relativeTo._id`, value: [banane._id]},
            ]
        }
    }))

    it('return empty roots', withTest({
        req: {
            method: "GET",
            url: `/api/root/${transport._id}`
        },
        res: {
            body: []
        }
    }))

})