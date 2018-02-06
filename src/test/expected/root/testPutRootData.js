import {ble, farine, gateau, gateauRoot, lait, setQuantity} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse} from "../testCommonData";
import {clon} from "../../testUtil";
import {cols} from "../../../main/const/collections";
import _ from 'lodash';

export const existingIdsNewQts = {};
const bleId = ble._id;
const farineId = farine._id;
existingIdsNewQts.req = {
    body: {
        trunk: {
            _id: bleId,
            quantity: {
                unit: "min",
                qt: 20
            }
        },
        root: {
            _id: farineId,
            quantity: {
                unit: "kg",
                qt: 10
            }
        }
    }
};
existingIdsNewQts.res = {
    body: oneModifiedResponse
};
existingIdsNewQts.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: bleId,
            quantity: existingIdsNewQts.req.body.trunk.quantity,
            items: [
                {
                    "_id": farine._id,
                    quantity: existingIdsNewQts.req.body.root.quantity,
                }
            ],

        }
    }
};


export const existingIdsAndQts = {};
const updatedRoots = clon(gateauRoot.items);
setQuantity(updatedRoots[1], 60);

existingIdsAndQts.req = {
    body: {
        trunk: {
            _id: gateau._id,
            quantity: {
                unit: "g",
                qt: 250
            }
        },
        root: {
            _id: lait._id,
            quantity: {
                unit: "L",
                qt: 30
            }
        }
    }
};
existingIdsAndQts.res = {
    body: oneModifiedResponse
};
existingIdsAndQts.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            ...(_.omit(gateauRoot,"items")),
            items: updatedRoots,
        }
    }
};

export const existingsAndUnitChange = {};
const updatedRootsWithDifferentUnit = clon(gateauRoot.items);
setQuantity(updatedRootsWithDifferentUnit[1], 250, "g");

existingsAndUnitChange.req = {
    body: {
        trunk: {
            _id: gateau._id,
            quantity: {
                unit: "kg",
                qt: 1
            }
        },
        root: {
            _id: lait._id,
            quantity: {
                unit: "g",
                qt: 500
            }
        }
    }
};
existingsAndUnitChange.res = {
    body: oneModifiedResponse
};
existingsAndUnitChange.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            ...(_.omit(gateauRoot,"items")),
            items: updatedRootsWithDifferentUnit,
        }
    }
};
