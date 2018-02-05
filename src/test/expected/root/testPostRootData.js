import {lait, gateauRoot, ble, farine, setQuantity, gateau} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {clon} from "../../testUtil";
import {cols} from "../../../main/const/collections";

const trunkId = ble._id;
const rootId = farine._id;

export const justIds = {};
justIds.req = {
    body: {
        trunk: {
            _id: trunkId
        },
        root: {
            _id: rootId
        }
    }
};
justIds.res = {
    body: oneUpsertedResponse(trunkId)
};
justIds.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: trunkId,
            items: [
                {
                    _id: rootId
                }
            ],

        }
    }
};

export const definingBothQt = {};
definingBothQt.req = {
    body: {
        trunk: {
            _id: trunkId,
            quantity: {
                unit: "min",
                qt: 20
            }
        },
        root: {
            _id: rootId,
            quantity: {
                unit: "kg",
                qt: 10
            }
        }
    }
};
definingBothQt.res = {
    body: oneUpsertedResponse(trunkId)
};
definingBothQt.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: trunkId,
            items: [
                {
                    "_id": farine._id,
                    quantity: definingBothQt.req.body.root.quantity,
                }
            ],

        }
    }
};

export const updatingTrunkQt = {};
const updatedRoots = clon(gateauRoot.items);
setQuantity(updatedRoots[1], 10);

updatingTrunkQt.req = {
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
                unit: "l",
                qt: 30
            }
        }
    }
};
updatingTrunkQt.res = {
    body: oneModifiedResponse
};
updatingTrunkQt.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: gateau._id,
            items: updatedRoots,
        }
    }
};

export const differentUnit = {};
const updatedRootsWithDifferentUnit = clon(gateauRoot.items);
setQuantity(updatedRootsWithDifferentUnit[1], 100, "g");

differentUnit.req = {
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
differentUnit.res = {
    body: oneModifiedResponse
};
differentUnit.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            _id: gateau._id,
            items: updatedRootsWithDifferentUnit,
        }
    }
};
