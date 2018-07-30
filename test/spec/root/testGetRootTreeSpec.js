import {clon} from "trees-test/dist/util"
import {removeItemQuantity, withIdQuantity, withQtCoef} from "trees-test/dist/domain"
import {bleTrunk, gateauRoot} from "../../database/gateau"
import {arbreTrunk} from "../../database/skate"
import {withIdQtUnit} from "trees-query"
import {coucheAdhesif, coucheAlu, couchePapier, couchePE, papierVA} from "../../database/papier"
import {aTrunk, daTrunk, dRoot} from "../../database/lettres"
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
                    "_id": "bbbbbbbbbbbbbbbbbbbbbbbb",
                    "items": [
                        {
                            "_id": "babababababababababababa",
                            "items": [
                                {
                                    "_id": "baabaabaabaabaabaabaabaa",
                                    "items": [
                                        {
                                            "_id": "e1e1e1e1e1e1e1e1e1e1e1e1",
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
                                    "_id": "babbabbabbabbabbabbabbab",
                                    "items": [
                                        {
                                            "_id": "e1e1e1e1e1e1e1e1e1e1e1e1",
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
                            "_id": "b2b2b2b2b2b2b2b2b2b2b2b2",
                            "items": [
                                {
                                    "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
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
                    "_id": "cccccccccccccccccccccccc",
                    "items": [
                        {
                            "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
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
                    "_id": "dddddddddddddddddddddddd",
                    "items": [
                        {
                            "_id": "dadadadadadadadadadadada",
                            "items": [
                                {
                                    "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
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
                            "_id": "dbdbdbdbdbdbdbdbdbdbdbdb",
                            "items": [
                                {
                                    "_id": "dbadbadbadbadbadbadbadba",
                                    "items": [
                                        {
                                            "_id": "dbaadbaadbaadbaadbaadbaa",
                                            "items": [
                                                {
                                                    "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
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

export const lettreNoDaQtGetRootTreeSpec = {
    req: {
        url: `/api/root/tree/500/g/${aTrunk._id}`,
    },
    res: {
        body: {
            _id: aTrunk._id,
            items: [
                {
                    "_id": "bbbbbbbbbbbbbbbbbbbbbbbb",
                    "items": [
                        {
                            "_id": "babababababababababababa",
                            "items": [
                                {
                                    "_id": "baabaabaabaabaabaabaabaa",
                                    "items": [
                                        {
                                            "_id": "e1e1e1e1e1e1e1e1e1e1e1e1",
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
                                    "_id": "babbabbabbabbabbabbabbab",
                                    "items": [
                                        {
                                            "_id": "e1e1e1e1e1e1e1e1e1e1e1e1",
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
                            "_id": "b2b2b2b2b2b2b2b2b2b2b2b2",
                            "items": [
                                {
                                    "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
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
                    "_id": "cccccccccccccccccccccccc",
                    "items": [
                        {
                            "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
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
                    "_id": "dddddddddddddddddddddddd",
                    "items": [
                        {
                            "_id": "dadadadadadadadadadadada",
                            "items": [
                                {
                                    "_id": "e2e2e2e2e2e2e2e2e2e2e2e2"
                                }
                            ]
                        },
                        {
                            "_id": "dbdbdbdbdbdbdbdbdbdbdbdb",
                            "items": [
                                {
                                    "_id": "dbadbadbadbadbadbadbadba",
                                    "items": [
                                        {
                                            "_id": "dbaadbaadbaadbaadbaadbaa",
                                            "items": [
                                                {
                                                    "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
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
                ...removeItemQuantity(clon(dRoot), daTrunk._id)
            }
        }
    }
}