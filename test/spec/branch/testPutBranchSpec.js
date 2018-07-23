import {oneModifiedResponse} from "trees-test/dist/domain";
import {cols} from "../../../src/const/collections";
import {bleTrunk, farineTrunk, gateauTrunk, laitBranch, laitTrunk} from "../../database/gateau";
import {setQuantity} from "trees-test/dist/domain";
import {clon} from "trees-test/dist/util";
import _ from 'lodash';

export const setQuantityBranchSpec = {};
setQuantityBranchSpec.req = {
    body: {
        trunk: {
            _id: bleTrunk._id,
            quantity: {
                unit: "min",
                qt: 20
            }
        },
        branch: {
            _id: farineTrunk._id,
            quantity: {
                unit: "kg",
                qt: 10
            }
        }
    }
};
setQuantityBranchSpec.res = {
    body: oneModifiedResponse
};
setQuantityBranchSpec.db = {
    expected: {
        colname: cols.BRANCH,
        doc: {
            ...setQuantityBranchSpec.req.body.trunk,
            items: [
                {
                    ...setQuantityBranchSpec.req.body.branch
                }
            ],

        }
    }
};

export const updateQuantityBranchSpec = {};
const updatedBranchs = clon(laitBranch.items);
setQuantity(updatedBranchs[1], 166.66666666666666);

updateQuantityBranchSpec.req = {
    body: {
        trunk: {
            _id: laitTrunk._id,
            quantity: {
                unit: "L",
                qt: 30
            }
        },
        branch: {
            _id: gateauTrunk._id,
            quantity: {
                unit: "g",
                qt: 250
            }
        }
    }
};
updateQuantityBranchSpec.res = {
    body: oneModifiedResponse
};
updateQuantityBranchSpec.db = {
    expected: {
        colname: cols.BRANCH,
        doc: {
            ...(_.omit(laitBranch, "items")),
            items: updatedBranchs,
        }
    }
};

export const updateQuantityAnotherUnitBranchSpec = {};
const updatedBranchsWithDifferentUnit = clon(laitBranch.items);
setQuantity(updatedBranchsWithDifferentUnit[1], 1, "kg");

updateQuantityAnotherUnitBranchSpec.req = {
    body: {
        trunk: {
            _id: laitTrunk._id,
            quantity: {
                unit: "m3",
                qt: 0.02
            }
        },
        branch: {
            _id: gateauTrunk._id,
            quantity: {
                unit: "kg",
                qt: 1
            }
        }
    }
};
updateQuantityAnotherUnitBranchSpec.res = {
    body: oneModifiedResponse
};
updateQuantityAnotherUnitBranchSpec.db = {
    expected: {
        colname: cols.BRANCH,
        doc: {
            ...(_.omit(laitBranch, "items")),
            items: updatedBranchsWithDifferentUnit,
        }
    }
};
