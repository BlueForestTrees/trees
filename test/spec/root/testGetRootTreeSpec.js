import {clon} from "test-api-express-mongo/dist/util"
import {removeItemQuantity, withIdQuantity, withQtCoef} from "test-api-express-mongo/dist/domain"
import {bleTrunk, gateauRoot} from "../../database/gateau"
import {arbreTrunk} from "../../database/skate"
import {withIdQtUnit} from "mongo-queries-blueforest"
import {coucheAdhesif, coucheAlu, couchePapier, couchePE, papierVA} from "../../database/papier"
import {aTrunk, b2Trunk, baaTrunk, babTrunk, baTrunk, bTrunk, cTrunk, daTrunk, dbaaTrunk, dbaTrunk, dbTrunk, dRoot, dTrunk, e1Trunk, e2Trunk} from "../../database/lettres"
import {cols} from "../../../src/const/collections"


const gateauRoot2Kg = clon(gateauRoot)
//on fait x4 sur la quantité
gateauRoot2Kg.quantity.qt = 2
gateauRoot2Kg.quantity.unit = "kg"
withQtCoef(withQtCoef(gateauRoot2Kg.items))
//on ajoute le blé à la farine
gateauRoot2Kg.items[0].items = [{_id: bleTrunk._id}]
export const gateauRootTreeSpec = {
    req: {
        url: `/api/root/tree/${gateauRoot2Kg.quantity.qt}/${gateauRoot2Kg.quantity.unit}/${gateauRoot2Kg._id}`,
    },
    res:{
        body: {
            ...gateauRoot2Kg
        }
    }
}

export const noRootsTreeSpec = {
    req: {
        url: `/api/root/tree/3/count/${arbreTrunk._id}`,
    },
    res: {
        body: {
            _id: arbreTrunk._id,
            quantity: {
                qt: 3,
                unit: "count"
            },
            items: []
        }
    }
}


export const papierAGetRootTreeSpec = {
    req: {
        url: `/api/root/tree/100/m2/${papierVA._id}`,
    },
    res: {
        body: {
            ...withIdQuantity(papierVA._id, 100, "m2"),
            items: [
                withIdQuantity(couchePE._id, 780, "kg"),
                withIdQuantity(couchePapier._id, 2070, "kg"),
                withIdQuantity(coucheAdhesif._id, 80, "kg"),
                withIdQuantity(coucheAlu._id, 890, "kg")
            ]
        }
    }
}

export const lettreGetRootTreeSpec = {
    req: {
        url: `/api/root/tree/500/g/${aTrunk._id}`,
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
                                                "qt": 5,
                                                "unit": "L"
                                            }
                                        }
                                    ],
                                    "quantity": {
                                        "qt": 0.5,
                                        "unit": "kg"
                                    }
                                },
                                {
                                    "_id": babTrunk._id,
                                    "items": [
                                        {
                                            "_id": e1Trunk._id,
                                            "quantity": {
                                                "qt": 0.25,
                                                "unit": "m3"
                                            }
                                        }
                                    ],
                                    "quantity": {
                                        "qt": 0.5,
                                        "unit": "kg"
                                    }
                                }
                            ],
                            "quantity": {
                                "qt": 0.5,
                                "unit": "kg"
                            }
                        },
                        {
                            "_id": b2Trunk._id,
                            "items": [
                                {
                                    "_id": e2Trunk._id,
                                    "quantity": {
                                        "qt": 0.5,
                                        "unit": "kg"
                                    }
                                }
                            ],
                            "quantity": {
                                "qt": 0.5,
                                "unit": "kg"
                            }
                        }
                    ],
                    "quantity": {
                        "qt": 0.5,
                        "unit": "kg"
                    }
                },
                {
                    "_id": cTrunk._id,
                    "items": [
                        {
                            "_id": e2Trunk._id,
                            "quantity": {
                                "qt": 0.5,
                                "unit": "kg"
                            }
                        }
                    ],
                    "quantity": {
                        "qt": 0.5,
                        "unit": "kg"
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
                                        "qt": 0.5,
                                        "unit": "kg"
                                    }
                                }
                            ],
                            "quantity": {
                                "qt": 0.5,
                                "unit": "kg"
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
                                                        "qt": 1,
                                                        "unit": "kg"
                                                    }
                                                }
                                            ],
                                            "quantity": {
                                                "qt": 0.5,
                                                "unit": "kg"
                                            }
                                        }
                                    ],
                                    "quantity": {
                                        "qt": 0.5,
                                        "unit": "kg"
                                    }
                                }
                            ],
                            "quantity": {
                                "qt": 0.5,
                                "unit": "kg"
                            }
                        }
                    ],
                    "quantity": {
                        "qt": 0.5,
                        "unit": "kg"
                    }
                }
            ],
            "quantity": {
                qt: 500,
                unit: "g"
            }
        }
    }
}

const dodo = removeItemQuantity(clon(dRoot), daTrunk._id)
console.log("remove qt from ", daTrunk._id, dodo)
export const lettreNoDaQtGetRootTreeSpec = {
    req: {
        url: `/api/root/tree/500/g/${aTrunk._id}`,
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
                                                "qt": 5,
                                                "unit": "L"
                                            }
                                        }
                                    ],
                                    "quantity": {
                                        "qt": 0.5,
                                        "unit": "kg"
                                    }
                                },
                                {
                                    "_id": babTrunk._id,
                                    "items": [
                                        {
                                            "_id": e1Trunk._id,
                                            "quantity": {
                                                "qt": 0.25,
                                                "unit": "m3"
                                            }
                                        }
                                    ],
                                    "quantity": {
                                        "qt": 0.5,
                                        "unit": "kg"
                                    }
                                }
                            ],
                            "quantity": {
                                "qt": 0.5,
                                "unit": "kg"
                            }
                        },
                        {
                            "_id": b2Trunk._id,
                            "items": [
                                {
                                    "_id": e2Trunk._id,
                                    "quantity": {
                                        "qt": 0.5,
                                        "unit": "kg"
                                    }
                                }
                            ],
                            "quantity": {
                                "qt": 0.5,
                                "unit": "kg"
                            }
                        }
                    ],
                    "quantity": {
                        "qt": 0.5,
                        "unit": "kg"
                    }
                },
                {
                    "_id": cTrunk._id,
                    "items": [
                        {
                            "_id": e2Trunk._id,
                            "quantity": {
                                "qt": 0.5,
                                "unit": "kg"
                            }
                        }
                    ],
                    "quantity": {
                        "qt": 0.5,
                        "unit": "kg"
                    }
                },
                {
                    "_id": dTrunk._id,
                    "items": [
                        {
                            "_id": daTrunk._id,
                            "items": [
                                {
                                    "_id": e2Trunk._id
                                }
                            ]
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
                                                        "qt": 1,
                                                        "unit": "kg"
                                                    }
                                                }
                                            ],
                                            "quantity": {
                                                "qt": 0.5,
                                                "unit": "kg"
                                            }
                                        }
                                    ],
                                    "quantity": {
                                        "qt": 0.5,
                                        "unit": "kg"
                                    }
                                }
                            ],
                            "quantity": {
                                "qt": 0.5,
                                "unit": "kg"
                            }
                        }
                    ],
                    "quantity": {
                        "qt": 0.5,
                        "unit": "kg"
                    }
                }
            ],
            "quantity": {
                qt: 500,
                unit: "g"
            }
        }
    },
    db: {
        preChange: {
            colname: cols.ROOT,
            doc: {
                ...dodo
            }
        }
    }
}