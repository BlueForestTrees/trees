import {init, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {banane, bananeBC, bananeBCRoots, camionTrunk} from "../../../database/banane"

describe('GET Root', function () {

    beforeEach(init(api, ENV, cols))

    it('return roots with relativeTo', withTest({
        req: {
            method: "GET",
            url: `/api/tree/root/${bananeBC._id}`
        },
        res: {
            bodypath: [
                {path: `$[?(@._id==="${bananeBCRoots[0].rootId}")].trunk.quantity.g`, value: [banane.quantity.g]},
                {path: `$[?(@._id==="${bananeBCRoots[1].rootId}")].trunk.name`, value: [camionTrunk.name]},
                {path: `$[?(@._id==="${bananeBCRoots[1].rootId}")].trunk.color`, value: [camionTrunk.color]},
                {path: `$[?(@._id==="${bananeBCRoots[1].rootId}")].relativeTo._id`, value: [banane._id]},
            ]
        }
    }))

    it('return empty roots', withTest({
        req: {
            method: "GET",
            url: `/api/tree/root/${camionTrunk._id}`
        },
        res: {
            body: []
        }
    }))

})