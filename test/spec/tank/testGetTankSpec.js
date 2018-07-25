import {removeItemQuantity, withQuantity} from "trees-test/dist/domain";
import {clon} from "trees-test/dist/util";
import {aTrunk, daTrunk, dbTrunk, dRoot, e1Trunk, e2Trunk} from "../../database/lettres";
import {cols} from "../../../src/const/collections";
import {laitTrunk} from "../../database/gateau";
import _ from 'lodash';
import {arbreTrunk, eauTrunk, elecTrunk, skateTrunk} from "../../database/skate";

export const lettreTankSpec = {
    req: {
        url: `/api/tank/500/g/${aTrunk._id}`
    },
    res: {
        body: {
            _id: aTrunk._id,
            ...withQuantity(500, "g"),
            items: [
                {
                    ..._.pick(e2Trunk, ['_id']),
                    "quantity": {
                        "qt": 2500,
                        "unit": "g",
                    }
                },
                {
                    ..._.pick(e1Trunk, ['_id']),
                    "quantity": {
                        "qt": 0.255,
                        "unit": "m3"
                    }
                }
            ]
        }
    }
};

export const avecUneQtManquanteTankSpec = {
    req: {
        url: `/api/tank/500/g/${aTrunk._id}`
    },
    db: {
        preChange: {
            colname: cols.ROOT,
            doc: {
                ...removeItemQuantity(clon(dRoot), daTrunk._id)
            }
        }
    },
    res: {
        body: {
            _id: aTrunk._id,
            ...withQuantity(500, "g"),
            items: [
                {
                    ..._.pick(e2Trunk, ['_id']),
                    "quantity": {
                        "qt": 2000,
                        "unit": "g",
                    }
                },
                {
                    ..._.pick(daTrunk, ['_id']),
                },
                {
                    ..._.pick(e1Trunk, ['_id']),
                    "quantity": {
                        "qt": 0.255,
                        "unit": "m3"
                    }
                }
            ]
        }
    }
};


export const avecUneQtManquanteTankSpec2 = {
    req: {
        url: `/api/tank/500/g/${aTrunk._id}`
    },
    db: {
        preChange: {
            colname: cols.ROOT,
            doc: {
                titi:"tutu",
                ...removeItemQuantity(clon(dRoot), dbTrunk._id)
            }
        }
    },
    res: {
        body: {
            _id: aTrunk._id,
            ...withQuantity(500, "g"),
            items: [
                {
                    ..._.pick(e2Trunk, ['_id']),
                    "quantity": {
                        "qt": 1500,
                        "unit": "g",
                    }
                },
                {
                    ..._.pick(dbTrunk, ['_id']),
                },
                {
                    ..._.pick(e1Trunk, ['_id']),
                    "quantity": {
                        "qt": 0.255,
                        "unit": "m3"
                    }
                }
            ]
        }
    }
};

export const sansTank = {
    req: {
        url: `/api/tank/3/L/${laitTrunk._id}`
    },
    res: {
        body: {
            _id: laitTrunk._id,
            ...withQuantity(3, "L"),
            items: []
        }
    }
};

export const linkAToSkateThenTank = [
    {
        req: {
            method: "PUT",
            url: "/api/link",
            body: {
                trunk: {_id: skateTrunk._id, ...withQuantity(10, "count")},
                root: {_id: aTrunk._id, ...withQuantity(1, "kg")}
            }
        }
    },
    {
        req: {
            url: `/api/tank/10/count/${skateTrunk._id}`
        },
        res: {
            body: {
                _id: skateTrunk._id,
                ...withQuantity(10, "count"),
                items: [
                    {
                        ..._.pick(eauTrunk, ['_id']),
                        "quantity": {
                            "qt": 0.01006,
                            "unit": "m3"
                        }
                    },
                    {
                        ..._.pick(elecTrunk, ['_id']),
                        "quantity": {
                            "qt": 86813397.216,
                            "unit": "cal"
                        }
                    },
                    {
                        ..._.pick(arbreTrunk, ['_id']),
                        "quantity": {
                            "qt": 0.005,
                            "unit": "count",
                        }
                    },
                    {
                        ..._.pick(e2Trunk, ['_id']),
                        "quantity": {
                            "qt": 5000,
                            "unit": "g",
                        }
                    },
                    {
                        ..._.pick(e1Trunk, ['_id']),
                        "quantity": {
                            "qt": 0.51,
                            "unit": "m3"
                        }
                    }
                ]
            }
        }
    }
];