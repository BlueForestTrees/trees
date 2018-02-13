import _ from 'lodash';
import {clon} from "../../util/testUtil";
import {removeItemQuantity, setQuantity, withDoubleQt, withoutQuantity} from "../../testIntegPlumbing";
import {farineRoot, gateauRoot, lait} from "../../database/gateau";
import {skateRoot} from "../../database/skate";
import {a, da, dRoot} from "../../database/lettres";
import {withNames} from "../../testIntegDatabase";
import {avecUneQtManquanteTankSpec} from "../tank/testGetTankData";
import {cols} from "../../../main/const/collections";

export const getRootsSpec = {};
const gateauItemsWithNames = withoutQuantity(withNames(clon(gateauRoot.items)));
getRootsSpec.req = {
    _id: gateauRoot._id
};
getRootsSpec.res = {
    body: {
        ..._.omit(gateauRoot, ["items", "quantity"]),
        items: gateauItemsWithNames
    }
};

export const emptyGetRootSpec = {};
emptyGetRootSpec.req = {
    _id: lait._id
};
emptyGetRootSpec.res = {
    body: {
        _id: lait._id,
        items: []
    }
};

const sameQtItems = withNames(clon(gateauRoot.items));
export const sameQtGetRootSpec = {};
sameQtGetRootSpec.req = {
    qt: gateauRoot.quantity.qt,
    unit: gateauRoot.quantity.unit,
    _id: gateauRoot._id
};
sameQtGetRootSpec.res = {
    body: {
        ..._.omit(gateauRoot, "items"),
        items: sameQtItems
    }
};


export const gateau1000GGetRootSpec = {};
const gato1000G = clon(gateauRoot);
withNames(gato1000G.items);
withDoubleQt([gato1000G]);
withDoubleQt(gato1000G.items);

gateau1000GGetRootSpec.req = {
    qt: gato1000G.quantity.qt,
    unit: gato1000G.quantity.unit,
    _id: gato1000G._id
};
gateau1000GGetRootSpec.res = {
    body: {
        ...gato1000G
    }
};

export const skate10GetRootSpec = {};
const skate10 = clon(skateRoot);
withNames(skate10.items);
withDoubleQt([skate10]);
withDoubleQt(skate10.items);
skate10GetRootSpec.req = {
    qt: skate10.quantity.qt,
    unit: skate10.quantity.unit,
    _id: skate10._id
};
skate10GetRootSpec.res = {
    body: {
        ...skate10
    }
};

export const otherUnitGetRootSpec = {};
const gateauRoot1Kg = clon(gateauRoot);
withNames(gateauRoot1Kg.items);
gateauRoot1Kg.quantity.qt = 1;
gateauRoot1Kg.quantity.unit = "kg";
withDoubleQt(gateauRoot1Kg.items);

otherUnitGetRootSpec.req = {
    qt: gateauRoot1Kg.quantity.qt,
    unit: gateauRoot1Kg.quantity.unit,
    _id: gateauRoot1Kg._id
};
otherUnitGetRootSpec.res = {
    body: {
        ...gateauRoot1Kg
    }
};


export const badUnitGetRootSpec = {};
const gateauRoot1L = clon(gateauRoot);
withNames(gateauRoot1L.items);
gateauRoot1L.quantity.unit = "L";

badUnitGetRootSpec.req = {
    qt: gateauRoot1L.quantity.qt,
    unit: gateauRoot1L.quantity.unit,
    _id: gateauRoot1L._id
};
badUnitGetRootSpec.res = {
    status: 400,
    bodyMessage: "Units mismatch: 'L' and 'g'"
};


export const farineNoBleQtGetRootSpec = {};
const myFarineRoot = clon(farineRoot);
withNames(myFarineRoot.items);
setQuantity(myFarineRoot, 60, "g");

farineNoBleQtGetRootSpec.req = {
    qt: myFarineRoot.quantity.qt,
    unit: myFarineRoot.quantity.unit,
    _id: myFarineRoot._id
};
farineNoBleQtGetRootSpec.res = {
    body: {
        ...myFarineRoot
    }
};

export const lettreGetRootSpec = {};
lettreGetRootSpec.req = {
    qt: 500,
    unit: "g",
    _id: a._id
};
lettreGetRootSpec.res = {
    body: {
        _id:a._id,
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

export const lettreNoDaQtGetRootSpec = {};
lettreNoDaQtGetRootSpec.req = {
    qt: 500,
    unit: "g",
    _id: a._id
};
lettreNoDaQtGetRootSpec.db = {
    preChange: {
        colname: cols.ROOT,
        doc: {
            ...removeItemQuantity(clon(dRoot), da._id)
        }
    }
};
lettreNoDaQtGetRootSpec.res = {
    body: {
        _id:a._id,
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
