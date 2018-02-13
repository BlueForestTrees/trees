import {removeItemQuantity, withQuantity} from "../../testPlumbing";
import {a, da, db, dRoot, e1, e2} from "../../database/lettres";
import {cols} from "../../../main/const/collections";
import {clon} from "../../util/testUtil";

export const lettreTankSpec = {};
lettreTankSpec.req = {
    _id: a._id,
    ...withQuantity(500, "g")
};

lettreTankSpec.res = {
    body: {
        _id: a._id,
        ...withQuantity(500, "g"),
        items: [
            {
                "_id": e2._id,
                "name": "end2",
                "quantity": {
                    "qt": 2500,
                    "unit": "g",
                }
            },
            {
                "_id": e1._id,
                "name": "end1",
                "quantity": {
                    "qt": 0.255,
                    "unit": "m3"
                }
            }
        ]
    }
};

export const avecUneQtManquanteTankSpec = {};
avecUneQtManquanteTankSpec.req = {
    _id: a._id,
    ...withQuantity(500, "g")
};
avecUneQtManquanteTankSpec.db = {
    preChange: {
        colname: cols.ROOT,
        doc: {
            ...removeItemQuantity(clon(dRoot), da._id)
        }
    }
};
avecUneQtManquanteTankSpec.res = {
    body: {
        _id: a._id,
        ...withQuantity(500, "g"),
        items: [
            {
                "_id": e2._id,
                "name": "end2",
                "quantity": {
                    "qt": 2000,
                    "unit": "g",
                }
            },
            {
                _id: da._id,
                name: "da"
            },
            {
                "_id": e1._id,
                "name": "end1",
                "quantity": {
                    "qt": 0.255,
                    "unit": "m3"
                }
            }
        ]
    }
};

export const avecUneQtManquanteTankSpec2 = {};
avecUneQtManquanteTankSpec2.req = {
    _id: a._id,
    ...withQuantity(500, "g")
};
avecUneQtManquanteTankSpec2.db = {
    preChange: {
        colname: cols.ROOT,
        doc: {
            ...removeItemQuantity(clon(dRoot), db._id)
        }
    }
};
avecUneQtManquanteTankSpec2.res = {
    body: {
        _id: a._id,
        ...withQuantity(500, "g"),
        items: [
            {
                "_id": e2._id,
                "name": "end2",
                "quantity": {
                    "qt": 1500,
                    "unit": "g",
                }
            },
            {
                _id: db._id,
                name: "db"
            },
            {
                "_id": e1._id,
                "name": "end1",
                "quantity": {
                    "qt": 0.255,
                    "unit": "m3"
                }
            }
        ]
    }
};