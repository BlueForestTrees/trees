import {clon} from "../../util/testUtil";
import {removeItemQuantity, withItem, withQtCoef} from "../../testPlumbing";
import {bleTrunk, gateauRoot} from "../../database/gateau";
import {arbreTrunk} from "../../database/skate";
import {withIdQtUnit} from "../../../main/util/query";
import {coucheAdhesif, coucheAlu, couchePapier, couchePE, papierVA} from "../../database/papier";
import {aTrunk, daTrunk, dRoot} from "../../database/lettres";
import {cols} from "../../../main/const/collections";

export const gateauRootTreeSpec = {};
const gateauRoot2Kg = clon(gateauRoot);
//on fait x4 sur la quantité
gateauRoot2Kg.quantity.qt = 2;
gateauRoot2Kg.quantity.unit = "kg";
withQtCoef(withQtCoef(gateauRoot2Kg.items));
//on ajoute le blé à la farine
gateauRoot2Kg.items[0].items = [{_id: bleTrunk._id}];

gateauRootTreeSpec.req = {
    qt: gateauRoot2Kg.quantity.qt,
    unit: gateauRoot2Kg.quantity.unit,
    _id: gateauRoot2Kg._id
};
gateauRootTreeSpec.res = {
    body: {
        ...gateauRoot2Kg
    }
};

export const noRootsTreeSpec = {};
noRootsTreeSpec.req = {
    qt: 3,
    unit: "count",
    _id: arbreTrunk._id
};
noRootsTreeSpec.res = {
    body: {
        _id: arbreTrunk._id,
        quantity: {
            qt: 3,
            unit: "count"
        },
        items: []
    }
};


export const papierAGetRootTreeSpec = {};
papierAGetRootTreeSpec.req = {
    _id:papierVA._id, qt: 100,unit: "m2"
};
papierAGetRootTreeSpec.res = {
    body: {
        ...withItem(papierVA._id, 100, "m2"),
        items:[
            withItem(couchePE._id, 780,"kg"),
            withItem(couchePapier._id, 2070,"kg"),
            withItem(coucheAdhesif._id, 80,"kg"),
            withItem(coucheAlu._id, 890,"kg")
        ]
    }
};

export const lettreGetRootTreeSpec = {};
lettreGetRootTreeSpec.req = {
    qt: 500,
    unit: "g",
    _id: aTrunk._id
};
lettreGetRootTreeSpec.res = {
    body: {
        _id:aTrunk._id,
        items:[
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
};

export const lettreNoDaQtGetRootTreeSpec = {};
lettreNoDaQtGetRootTreeSpec.req = {
    qt: 500,
    unit: "g",
    _id: aTrunk._id
};
lettreNoDaQtGetRootTreeSpec.db = {
    preChange: {
        colname: cols.ROOT,
        doc: {
            ...removeItemQuantity(clon(dRoot), daTrunk._id)
        }
    }
};
lettreNoDaQtGetRootTreeSpec.res = {
    body: {
        _id:aTrunk._id,
        items:[
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
};