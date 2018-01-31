import {downTrunkNoQt, laRoot, leftTrunk, rightTrunk, trunkQtRootsQt, setQuantity} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {cols} from "../../../src/const/collections";
import {clon} from "../../testUtil";

const trunkId = leftTrunk._id;
const rootId = rightTrunk._id;

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
                    "_id": rightTrunk._id,
                    quantity: definingBothQt.req.body.root.quantity,
                }
            ],

        }
    }
};

export const updatingTrunkQt = {};
const updatedRoots = clon(laRoot.items);
setQuantity(updatedRoots[1], 10);

updatingTrunkQt.req = {
    body: {
        trunk: {
            _id: trunkQtRootsQt._id,
            quantity: {
                unit: "min",
                qt: 60
            }
        },
        root: {
            _id: downTrunkNoQt._id,
            quantity: {
                unit: "kg",
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
            _id: trunkQtRootsQt._id,
            items: updatedRoots,
        }
    }
};

export const differentUnit = {};
const updatedRootsWithDifferentUnit = clon(laRoot.items);
setQuantity(updatedRootsWithDifferentUnit[1], 100, "g");

differentUnit.req = {
    body: {
        trunk: {
            _id: trunkQtRootsQt._id,
            quantity: {
                unit: "h",
                qt: 1
            }
        },
        root: {
            _id: downTrunkNoQt._id,
            quantity: {
                unit: "g",
                qt: 300
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
            _id: trunkQtRootsQt._id,
            items: updatedRootsWithDifferentUnit,

        }
    }
};
