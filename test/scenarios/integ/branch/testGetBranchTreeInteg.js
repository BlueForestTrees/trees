import {arbreTrunk, boisTrunk, bucheTrunk, chauffageTrunk, foretTrunk, grandeForetTrunk, plancheTrunk, refugeBioTrunk, skateTrunk} from "../../../database/skate"
import {init, withTest} from "test-api-express-mongo/dist/api"
import {withIdBqtG} from "test-api-express-mongo/dist/domain"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {aTrunk} from "../../../database/lettres"

describe('GET Branch Tree', function () {

    beforeEach(init(api, ENV, cols))

    it('return null', withTest({
        req:{
            url:`/api/branch/tree/10000/Mass/${aTrunk._id}`
        },
        res:{
            body: {
                _id: aTrunk._id,
                quantity: {bqt: 10000,g: "Mass"},
                items: []
            }
        }
    }))

    it('return a branch tree', withTest({
        req:{
            url:`/api/branch/tree/100/Nomb/${arbreTrunk._id}`
        },
        res:{
            body: {
                ...withIdBqtG(arbreTrunk._id, 100, "Nomb"),
                items: [
                    {
                        "_id": boisTrunk._id,
                        "quantity": {
                            "bqt": 100000000,
                            "g": "Mass"
                        },
                        "items": [
                            {
                                "_id": plancheTrunk._id,
                                "quantity": {
                                    "bqt": 200000,
                                    "g": "Nomb"
                                },
                                "items": [
                                    {
                                        "_id": skateTrunk._id,
                                        "quantity": {
                                            "bqt": 200000,
                                            "g": "Nomb"
                                        }
                                    }
                                ]
                            },
                            {
                                "_id": bucheTrunk._id,
                                "quantity": {
                                    "bqt": 100000000,
                                    "g": "Mass"
                                },
                                "items": [
                                    {
                                        "_id": chauffageTrunk._id,
                                        "quantity": {
                                            "bqt": 120000000,
                                            "g": "Duré"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "_id": foretTrunk._id,
                        "quantity": {
                            "bqt": 0.1,
                            "g": "Nomb"
                        },
                        "items": [
                            {
                                "_id": grandeForetTrunk._id,
                                "items": [
                                    {
                                        "_id": refugeBioTrunk._id
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }))


})