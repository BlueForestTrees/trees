import {oneModifiedResponse} from "../testCommonData";
import {clon} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import _ from 'lodash';
import {ble, farine, gateau, gateauRoot, lait} from "../../database/gateau";
import {setQuantity} from "../../testPlumbing";

export const existingIdsNewQtsSpec = {};
const bleId = ble._id;
const farineId = farine._id;
existingIdsNewQtsSpec.req = {
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
existingIdsNewQtsSpec.res = {
    body: oneModifiedResponse
};
existingIdsNewQtsSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: bleId,
            quantity: existingIdsNewQtsSpec.req.body.trunk.quantity,
            items: [
                {
                    "_id": farine._id,
                    quantity: existingIdsNewQtsSpec.req.body.root.quantity,
                }
            ],

        }
    }
};


export const existingIdsAndQtsSpec = {};
const updatedRoots = clon(gateauRoot.items);
setQuantity(updatedRoots[1], 60);

existingIdsAndQtsSpec.req = {
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
existingIdsAndQtsSpec.res = {
    body: oneModifiedResponse
};
existingIdsAndQtsSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            ...(_.omit(gateauRoot, "items")),
            items: updatedRoots,
        }
    }
};

export const existingsAndUnitChangeSpec = {};
const updatedRootsWithDifferentUnit = clon(gateauRoot.items);
setQuantity(updatedRootsWithDifferentUnit[1], 250, "g");

existingsAndUnitChangeSpec.req = {
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
existingsAndUnitChangeSpec.res = {
    body: oneModifiedResponse
};
existingsAndUnitChangeSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            ...(_.omit(gateauRoot, "items")),
            items: updatedRootsWithDifferentUnit,
        }
    }
};
