import {oneModifiedResponse} from "../testCommonSpec";
import {clon, setQuantity} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import _ from 'lodash';
import {bleTrunk, farineRoot, farineTrunk, gateauRoot, gateauTrunk, laitTrunk} from "../../database/gateau";
import {withIdQuantity} from "../../../../../web/src/test/testPlumbing";

let someFarine = withIdQuantity(farineTrunk._id, 10, "kg");
let someBle = withIdQuantity(bleTrunk._id, 20, "min");

const putRootUrl = {method: "PUT", url: '/api/root',};

export const setQuantityRootSpec = {
    req: {
        ...putRootUrl,
        body: {
            trunk: someFarine,
            root: someBle
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: {
                ...someFarine,
                items: [someBle],
            }
        }
    }
};

let someLaitWithRelativeTo = {relativeTo: bleTrunk._id, ...withIdQuantity(laitTrunk._id, 1, "L")};

export const putRelativeToRootSpec = {
    req: {
        ...putRootUrl,
        body: {
            trunk: someFarine,
            root: someLaitWithRelativeTo
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: {
                ...someFarine,
                items: [...farineRoot.items, someLaitWithRelativeTo],
            }
        }
    }
};


export const updateQuantityRootSpec = {};
const updatedRoots = clon(gateauRoot.items);
setQuantity(updatedRoots[1], 60);

updateQuantityRootSpec.req = {
    ...putRootUrl,
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
    ...putRootUrl,
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
