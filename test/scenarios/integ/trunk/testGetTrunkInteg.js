import {init, withTest} from "test-api-express-mongo"
import api from "../../../../src"
import {cols} from "../../../../src/const/collections"
import ENV from "../../../../src/env"
import {refugeBioTrunk, skateTrunk, sportCatId} from "../../../database/skate"
import {baaTrunk, e1Trunk} from "../../../database/lettres"
import {bateauTrunk, voitureTrunk} from "../../../database/transports"
import {omit, pick} from 'lodash'
import {gateauTrunk} from "../../../database/gateau"
import {papierVA, papierVB} from "../../../database/papier"
import {withBqtG} from "test-api-express-mongo"

describe('GET Trunk', function () {

    beforeEach(init(api, ENV, cols))

    it('search by cat', withTest({
        req: {
            url: `/api/tree/trunks?c1=${sportCatId}`,
        },
        res: {
            body: [skateTrunk]
        }
    }))

    it('search ps=10', withTest([
        {
            req: {
                url: `/api/tree/trunks?ps=10`,
            },
            res: {
                bodypath: [{
                    path: "$..name", value: ["papier version A", "papier version B", "couche Plastique Polyéthylène", "couche Papier", "bateau", "voiture", "couche Adhésif", "blé", "Farine", "Lait"]
                }]
            }
        }, {
            req: {
                url: `/api/tree/trunks?ps=9&aidx=${papierVA._id}`,
            },
            res: {
                bodypath: [{path: "$..name", value: ["papier version B", "couche Plastique Polyéthylène", "couche Papier", "bateau", "voiture", "couche Adhésif", "blé", "Farine", "Lait"]}]
            }
        }
    ]))

    it('search with _ids in', withTest({
        req: {
            url: `/api/tree/trunk?_ids=${skateTrunk._id}`,
        },
        res: {
            body: [skateTrunk]
        }
    }))

    it('search with another _ids in', withTest({
        req: {
            url: `/api/tree/trunk?_ids=${skateTrunk._id}&_ids=${e1Trunk._id}`,
        },
        res: {
            body: [skateTrunk,e1Trunk]
        }
    }))

    it('return 400 since ids are bad', withTest({
        req: {
            url: `/api/tree/trunk?_ids=blabla`,
        },
        res: {
            code: 400,
            bodypath: {path: "$.errorCode", value: [2]}
        }
    }))

    it('search by name', withTest({
        req: {
            url: `/api/tree/trunks?q=ska`,
        },
        res: {
            body: [skateTrunk]
        }
    }))

    it('search by name 2', withTest({
        req: {
            url: `/api/tree/trunks?q=ers`,
        },
        res: {
            body: [
                papierVA,
                papierVB,
                refugeBioTrunk
            ]
        }
    }))

    it('search by type', withTest({
        req: {
            url: `/api/tree/trunks?g=Tran`,
        },
        res: {
            body: [
                bateauTrunk,
                voitureTrunk,
            ]
        }
    }))

    it('search by name and type', withTest({
        req: {
            url: `/api/tree/trunks?q=voi&t=TR`,
        },
        res: {
            body: [
                voitureTrunk,
            ]
        }
    }))

    it('get gateau trunk', withTest({
        req: {
            url: `/api/tree/trunk/${gateauTrunk._id}`
        },
        res: {
            body: gateauTrunk
        }
    }))

    it('get baa trunk with decimal qt', withTest({
        req: {
            url: `/api/tree/trunk/${baaTrunk._id}`
        },
        res: {
            body: {
                ...baaTrunk,
                ...withBqtG(10, "Mass")
            }
        }
    }))

})