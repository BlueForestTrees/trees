import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import {cols} from "../../../../src/const/collections"
import ENV from "../../../../src/env"
import {eauTrunk, elecTrunk, skateTrunk} from "../../../database/skate"
import {notInSearchMixin} from "test-api-express-mongo/dist/domain"
import {baaTrunk, e1Trunk, e2Trunk} from "../../../database/lettres"
import {bateauTrunk, voitureTrunk} from "../../../database/transports"
import {omit, pick} from 'lodash'
import {gateauTrunk} from "../../../database/gateau"

describe('GET Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('search by name ps=2', withTest({
        req: {
            url: `/api/trunks?ps=2`,
        },
        res: {
            bodypath: [{path: "$..name", value: ["a", "arbre"]}]
        }
    }))

    it('search by name ps=1 aidx=a', withTest({
        req: {
            url: `/api/trunks?ps=1&aidx=aaaaaaaaaaaaaaaaaaaaaaaa`,
        },
        res: {
            bodypath: [{path: "$..name", value: ["arbre"]}]
        }
    }))

    it('return the asked trees', withTest({
        req: {
            url: `/api/trunk?_ids=${skateTrunk._id}`,
        },
        res: {
            body: [omit(skateTrunk, notInSearchMixin)]
        }
    }))

    it('return the asked trees 2', withTest({
        req: {
            url: `/api/trunk?_ids=${skateTrunk._id}&_ids=${e1Trunk._id}`,
        },
        res: {
            body: [omit(skateTrunk, notInSearchMixin), omit(e1Trunk, notInSearchMixin)]
        }
    }))

    it('return 400 since id is bad', withTest({
        req: {
            url: `/api/trunk?_ids=blabla`,
        },
        res: {
            code: 400,
            bodypath: {path: "$.errorCode", value: [2]}
        }
    }))

    it('search by name', withTest({
        req: {
            url: `/api/trunks?q=${skateTrunk.name.substring(0, 3)}`,
        },
        res: {
            body: [omit(skateTrunk, notInSearchMixin)]
        }
    }))

    it('search by name 2', withTest({
        req: {
            url: `/api/trunks?q=${eauTrunk.name.substring(0, 1)}`,
        },
        res: {
            body: [
                omit(e1Trunk, notInSearchMixin),
                omit(e2Trunk, notInSearchMixin),
                omit(eauTrunk, notInSearchMixin),
                omit(elecTrunk, notInSearchMixin)
            ]
        }
    }))

    it('search by type', withTest({
        req: {
            url: `/api/trunks?t=TR`,
        },
        res: {
            body: [
                omit(bateauTrunk, notInSearchMixin),
                omit(voitureTrunk, notInSearchMixin),
            ]
        }
    }))

    it('search by name and type', withTest({
        req: {
            url: `/api/trunks?q=voi&t=TR`,
        },
        res: {
            body: [
                omit(voitureTrunk, notInSearchMixin),
            ]
        }
    }))

    it('get gateau trunk', withTest({
        req: {
            url: `/api/trunk/${gateauTrunk._id}`
        },
        res: {
            body: omit(gateauTrunk, 'name_lower')
        }
    }))

    it('get baa trunk with decimal qt', withTest({
        req: {
            url: `/api/trunk/0.1/kg/${baaTrunk._id}`
        },
        res: {
            body: {...omit(baaTrunk, ['name_lower', 'quantity']), quantity: {qt: 0.1, unit: "kg"}}
        }
    }))

    it('get gateau trunk with qt', withTest({
        req: {
            url: `/api/trunk/5/kg/${gateauTrunk._id}`
        },
        res: {
            body: {...omit(gateauTrunk, ['name_lower', 'quantity']), quantity: {qt: 5, unit: "kg"}}
        }
    }))

    it('get bateau trunk with qt', withTest({
        req: {
            url: `/api/trunk/7/t*km/${bateauTrunk._id}`
        },
        res: {
            body: {...omit(bateauTrunk, ['name_lower', 'quantity']), quantity: {qt: 7, unit: "t*km"}}
        }
    }))

})