import {oneModifiedResponse} from "../testCommonData";
import {clon} from "../../util/testIntegUtil";
import {cols} from "../../../main/const/collections";
import _ from 'lodash';
import {bleTrunk, farineTrunk, gateauRoot, gateauTrunk, laitTrunk} from "../../database/gateau";
import {setQuantity} from "../../util/testIntegUtil";

export const setQuantityRootSpec = {};
setQuantityRootSpec.req = {
    body: {
        trunk: {
            _id: farineTrunk._id,
            quantity: {
                unit: "kg",
                qt: 10
            }
        },
        root: {
            _id: bleTrunk._id,
            quantity: {
                unit: "min",
                qt: 20
            }
        }
    }
};
setQuantityRootSpec.res = {
    body: oneModifiedResponse
};
setQuantityRootSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            ...setQuantityRootSpec.req.body.trunk,
            items: [
                setQuantityRootSpec.req.body.root
            ],

        }
    }
};


export const updateQuantityRootSpec = {};
const updatedRoots = clon(gateauRoot.items);
setQuantity(updatedRoots[1], 60);

updateQuantityRootSpec.req = {
    body: {
        trunk: {
            _id: gateauTrunk._id,
            quantity: {
                unit: "g",
                qt: 250
            }
        },
        root: {
            _id: laitTrunk._id,
            quantity: {
                unit: "L",
                qt: 30
            }
        }
    }
};
updateQuantityRootSpec.res = {
    body: oneModifiedResponse
};
updateQuantityRootSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            ...(_.omit(gateauRoot, "items")),
            items: updatedRoots,
        }
    }
};

export const updateQuantityAnotherUnitRootSpec = {};
const updatedRootsWithDifferentUnit = clon(gateauRoot.items);
setQuantity(updatedRootsWithDifferentUnit[1], 0.01, "m3");

updateQuantityAnotherUnitRootSpec.req = {
    body: {
        trunk: {
            _id: gateauTrunk._id,
            quantity: {
                unit: "kg",
                qt: 1
            }
        },
        root: {
            _id: laitTrunk._id,
            quantity: {
                unit: "m3",
                qt: 0.02
            }
        }
    }
};
updateQuantityAnotherUnitRootSpec.res = {
    body: oneModifiedResponse
};
updateQuantityAnotherUnitRootSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            ...(_.omit(gateauRoot, "items")),
            items: updatedRootsWithDifferentUnit,
        }
    }
};
