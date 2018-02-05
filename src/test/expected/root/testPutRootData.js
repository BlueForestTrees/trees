import {lait, gateauRoot, ble, farine, setQuantity, gateau, biere, capsule} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {clon} from "../../testUtil";
import {cols} from "../../../main/const/collections";

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
    body: oneUpsertedResponse(bleId)
};
existingIdsNewQts.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: bleId,
            items: [
                {
                    "_id": farine._id,
                    quantity: existingIdsNewQts.req.body.root.quantity,
                }
            ],

        }
    }
};


//TODO ici ne plus se baser sur la quantité du trunk mais déplacer dans root
export const existingIdsAndQts = {};
const updatedRoots = clon(gateauRoot.items);
setQuantity(updatedRoots[1], 10);

existingIdsAndQts.req = {
    body: {
        trunk: {
            _id: gateau._id,
            quantity: {
                unit: "g",
                qt: 600
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
            _id: gateau._id,
            items: updatedRoots,
        }
    }
};

export const existingsAndUnitChange = {};
const updatedRootsWithDifferentUnit = clon(gateauRoot.items);
setQuantity(updatedRootsWithDifferentUnit[1], 100, "g");

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
            _id: gateau._id,
            items: updatedRootsWithDifferentUnit,
        }
    }
};
