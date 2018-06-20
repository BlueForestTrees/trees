import {clon, removeItemQuantity, withQuantity} from "../../util/testUtil";
import {aTrunk, daTrunk, dbTrunk, dRoot, e1Trunk, e2Trunk} from "../../database/lettres";
import {cols} from "../../../main/const/collections";
import {laitTrunk} from "../../database/gateau";
import _ from 'lodash';

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
                    ..._.pick(e2Trunk, ['_id', 'name', 'color']),
                    "quantity": {
                        "qt": 2500,
                        "unit": "g",
                    }
                },
                {
                    ..._.pick(e1Trunk, ['_id', 'name', 'color']),
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
                    ..._.pick(e2Trunk, ['_id', 'name', 'color']),
                    "quantity": {
                        "qt": 2000,
                        "unit": "g",
                    }
                },
                {
                    ..._.pick(daTrunk, ['_id', 'name', 'color']),
                },
                {
                    ..._.pick(e1Trunk, ['_id', 'name', 'color']),
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
                    ..._.pick(e2Trunk, ['_id', 'name', 'color']),
                    "quantity": {
                        "qt": 1500,
                        "unit": "g",
                    }
                },
                {
                    ..._.pick(dbTrunk, ['_id', 'name', 'color']),
                },
                {
                    ..._.pick(e1Trunk, ['_id', 'name', 'color']),
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