import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import {cols} from "../../../../src/const/collections"
import ENV from "../../../../src/env"
import {arbreTrunk, eauTrunk, elecTrunk, skateTrunk} from "../../../database/skate"
import {notInSearchMixin} from "test-api-express-mongo/dist/domain"
import {aTrunk, b2Trunk, baaTrunk, babTrunk, baTrunk, bTrunk, e1Trunk, e2Trunk} from "../../../database/lettres"
import {bateauTrunk, voitureTrunk} from "../../../database/transports"
import {omit, pick} from 'lodash'
import {gateauTrunk} from "../../../database/gateau"
import {bananeBC} from "../../../database/banane"
import {biere} from "../../../database/biere"

describe('GET Trunks', function () {

    beforeEach(init(api, ENV, cols))

    it('search ps=10', withTest([
        {
            req: {
                url: `/api/trunks?ps=10`,
            },
            res: {
                bodypath: [{
                    path: "$..name", value: ["skate", "planche", "bois", "arbre", "roulette", "elec", "eau", "foret", "buche", "chauffage"]
                }]
            }
        }, {
            req: {
                url: `/api/trunks?ps=9&aidx=${skateTrunk._id}`,
            },
            res: {
                bodypath: [{path: "$..name", value: ["planche", "bois", "arbre", "roulette", "elec", "eau", "foret", "buche", "chauffage"]}]
            }
        }
    ]))

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
            body: [
                omit(skateTrunk, notInSearchMixin),
                omit(e1Trunk, notInSearchMixin)
            ]
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
                omit(elecTrunk, notInSearchMixin),
                omit(eauTrunk, notInSearchMixin),
                omit(e1Trunk, notInSearchMixin),
                omit(e2Trunk, notInSearchMixin)
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