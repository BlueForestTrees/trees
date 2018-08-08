import {expect} from 'chai'
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleTrunk, gateauRoot} from "../../../database/gateau"
import {removeItemQuantity, withIdBqtG, withQtCoef} from "test-api-express-mongo/dist/domain"
import {arbreTrunk} from "../../../database/skate"
import {coucheAdhesif, coucheAlu, couchePapier, couchePE, papierVA} from "../../../database/papier"
import {aTrunk, b2Trunk, baaTrunk, babTrunk, baTrunk, bTrunk, cTrunk, daTrunk, dbaaTrunk, dbaTrunk, dbTrunk, dRoot, dTrunk, e1Trunk, e2Trunk} from "../../../database/lettres"

describe('GET Root tree', function () {

    beforeEach(init(api, ENV, cols))

    it('return a little tree', withTest({
        req: {
            url: `/api/root/tree/${gateauRoot.quantity.bqt * 4}/Mass/${gateauRoot._id}`,
        },
        res: {
            body: {
                ...withIdBqtG(gateauRoot._id, gateauRoot.quantity.bqt * 4, gateauRoot.quantity.g),
                items: withQtCoef([{...gateauRoot.items[0], items: [{_id: bleTrunk._id}]}, gateauRoot.items[1]], 4)
            }
        }
    }))

    it('return the letters tree', withTest({
        req: {
            url: `/api/root/tree/500/Mass/${aTrunk._id}`,
        },
        res: {
            body: {
                _id: aTrunk._id,
                items: [
                    {
                        "_id": bTrunk._id,
                        "items": [
                            {
                                "_id": baTrunk._id,
                                "items": [
                                    {
                                        "_id": baaTrunk._id,
                                        "items": [
                                            {
                                                "_id": e1Trunk._id,
                                                "quantity": {
                                                    "bqt": 0.005,
                                                    "g": "Volu"
                                                }
                                            }
                                        ],
                                        "quantity": {
                                            "bqt": 500,
                                            "g": "Mass"
                                        }
                                    },
                                    {
                                        "_id": babTrunk._id,
                                        "items": [
                                            {
                                                "_id": e1Trunk._id,
                                                "quantity": {
                                                    "bqt": 0.25,
                                                    "g": "Volu"
                                                }
                                            }
                                        ],
                                        "quantity": {
                                            "bqt": 500,
                                            "g": "Mass"
                                        }
                                    }
                                ],
                                "quantity": {
                                    "bqt": 500,
                                    "g": "Mass"
                                }
                            },
                            {
                                "_id": b2Trunk._id,
                                "items": [
                                    {
                                        "_id": e2Trunk._id,
                                        "quantity": {
                                            "bqt": 500,
                                            "g": "Mass"
                                        }
                                    }
                                ],
                                "quantity": {
                                    "bqt": 500,
                                    "g": "Mass"
                                }
                            }
                        ],
                        "quantity": {
                            "bqt": 500,
                            "g": "Mass"
                        }
                    },
                    {
                        "_id": cTrunk._id,
                        "items": [
                            {
                                "_id": e2Trunk._id,
                                "quantity": {
                                    "bqt": 500,
                                    "g": "Mass"
                                }
                            }
                        ],
                        "quantity": {
                            "bqt": 500,
                            "g": "Mass"
                        }
                    },
                    {
                        "_id": dTrunk._id,
                        "items": [
                            {
                                "_id": daTrunk._id,
                                "items": [
                                    {
                                        "_id": e2Trunk._id,
                                        "quantity": {
                                            "bqt": 500,
                                            "g": "Mass"
                                        }
                                    }
                                ],
                                "quantity": {
                                    "bqt": 500,
                                    "g": "Mass"
                                }
                            },
                            {
                                "_id": dbTrunk._id,
                                "items": [
                                    {
                                        "_id": dbaTrunk._id,
                                        "items": [
                                            {
                                                "_id": dbaaTrunk._id,
                                                "items": [
                                                    {
                                                        "_id": e2Trunk._id,
                                                        "quantity": {
                                                            "bqt": 1000,
                                                            "g": "Mass"
                                                        }
                                                    }
                                                ],
                                                "quantity": {
                                                    "bqt": 500,
                                                    "g": "Mass"
                                                }
                                            }
                                        ],
                                        "quantity": {
                                            "bqt": 500,
                                            "g": "Mass"
                                        }
                                    }
                                ],
                                "quantity": {
                                    "bqt": 500,
                                    "g": "Mass"
                                }
                            }
                        ],
                        "quantity": {
                            "bqt": 500,
                            "g": "Mass"
                        }
                    }
                ],
                "quantity": {
                    "bqt": 500,
                    "g": "Mass"
                }
            }
        }
    }))

    it('return the papier tree', withTest({
        req: {
            url: `/api/root/tree/100/Surf/${papierVA._id}`,
        },
        res: {
            body: {
                ...withIdBqtG(papierVA._id, 100, "Surf"),
                items: [
                    withIdBqtG(couchePE._id, 780000, "Mass"),
                    withIdBqtG(couchePapier._id, 2070000, "Mass"),
                    withIdBqtG(coucheAdhesif._id, 80000, "Mass"),
                    withIdBqtG(coucheAlu._id, 890000, "Mass")
                ]
            }
        }
    }))

    it('return null', withTest({
        req: {
            url: `/api/root/tree/3/Nomb/${arbreTrunk._id}`,
        },
        res: {
            body: {
                _id: arbreTrunk._id,
                quantity: {
                    bqt: 3,
                    g: "Nomb"
                },
                items: []
            }
        }
    }))

})