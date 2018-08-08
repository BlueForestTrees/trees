import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import {cols} from "../../../../src/const/collections"
import ENV from "../../../../src/env"
import {eauTrunk, elecTrunk, refugeBioTrunk, skateTrunk} from "../../../database/skate"
import {notInSearchMixin} from "test-api-express-mongo/dist/domain"
import {baaTrunk, e1Trunk, e2Trunk} from "../../../database/lettres"
import {bateauTrunk, voitureTrunk} from "../../../database/transports"
import {omit, pick} from 'lodash'
import {gateauTrunk} from "../../../database/gateau"
import {papierVA, papierVB} from "../../../database/papier"
import {withBqtG} from "test-api-express-mongo/dist/domain"

describe('GET Trunk', function () {

    beforeEach(init(api, ENV, cols))

    it('search ps=10', withTest([
        {
            req: {
                url: `/api/trunks?ps=10`,
            },
            res: {
                bodypath: [{
                    path: "$..name", value: ["papier version A", "papier version B", "couche Plastique Polyéthylène", "couche Papier", "bateau", "voiture", "couche Adhésif", "blé", "Farine", "Lait"]
                }]
            }
        }, {
            req: {
                url: `/api/trunks?ps=9&aidx=${papierVA._id}`,
            },
            res: {
                bodypath: [{path: "$..name", value: ["papier version B", "couche Plastique Polyéthylène", "couche Papier", "bateau", "voiture", "couche Adhésif", "blé", "Farine", "Lait"]}]
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

    it('return 400 since ids are bad', withTest({
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
            url: `/api/trunks?q=ers`,
        },
        res: {
            body: [
                omit(papierVA, notInSearchMixin),
                omit(papierVB, notInSearchMixin),
                omit(refugeBioTrunk, notInSearchMixin)
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
            url: `/api/trunk/100/Mass/${baaTrunk._id}`
        },
        res: {
            body: {...omit(baaTrunk, ['name_lower', 'quantity']), ...withBqtG(100, "Mass")}
        }
    }))

    it('get gateau trunk with qt', withTest({
        req: {
            url: `/api/trunk/5000/Mass/${gateauTrunk._id}`
        },
        res: {
            body: {...omit(gateauTrunk, ['name_lower', 'quantity']), ...withBqtG(5000, "Mass")}
        }
    }))

    it('get bateau trunk with qt', withTest({
        req: {
            url: `/api/trunk/7/Tran/${bateauTrunk._id}`
        },
        res: {
            body: {...omit(bateauTrunk, ['name_lower', 'quantity']), ...withBqtG(7, "Tran")}
        }
    }))

})