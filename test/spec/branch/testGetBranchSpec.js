import _ from 'lodash';
import {withError, withValidationError} from "trees-test/dist/domain";
import {clon} from "trees-test/dist/util";
import {withoutQuantity, withQtCoef, withIds} from "trees-test/dist/domain";

import {farineBranch, laitBranch, pizzaTrunk} from "../../database/gateau";

export const getBranchsSpec = {
    req: {
        url: `/api/branch/${farineBranch._id}`
    },
    res: {
        body: {
            ..._.omit(farineBranch, ["items", "quantity"]),
            items: withoutQuantity(clon(farineBranch.items))
        }
    }
};

export const emptyGetBranchSpec = {
    req: {
        url: `/api/branch/${pizzaTrunk._id}`
    },
    res: {
        body: {
            _id: pizzaTrunk._id,
            items: []
        }
    }
};

export const sameQtGetBranchSpec = {
    req: {
        url: `/api/branch/${farineBranch.quantity.qt}/${farineBranch.quantity.unit}/${farineBranch._id}`
    },
    res: {
        body: {
            ..._.omit(farineBranch, "items"),
            items: farineBranch.items
        }
    }
};

const farine1000G = clon(farineBranch);
withQtCoef([farine1000G]);
withQtCoef(farine1000G.items);
export const farine1000GGetBranchSpec = {
    req: {
        url: `/api/branch/${farine1000G.quantity.qt}/${farine1000G.quantity.unit}/${farine1000G._id}`
    },
    res: {
        body: {
            ...farine1000G
        }
    }
};


// export const skate10GetBranchSpec = {};
// const skate10 = clon(skateBranch);
// withNames(skate10.items);
// withDoubleQt([skate10]);
// withDoubleQt(skate10.items);
// skate10GetBranchSpec.req = {
//     qt: skate10.quantity.qt,
//     unit: skate10.quantity.unit,
//     _id: skate10._id
// };
// skate10GetBranchSpec.res = {
//     body: {
//         ...skate10
//     }
// };
const farineBranch1Kg = clon(farineBranch);
farineBranch1Kg.quantity.qt = 1;
farineBranch1Kg.quantity.unit = "kg";
withQtCoef(farineBranch1Kg.items,5);
export const otherUnitGetBranchSpec = {
    req: {
        url: `/api/branch/${farineBranch1Kg.quantity.qt}/${farineBranch1Kg.quantity.unit}/${farineBranch1Kg._id}`
    },
    res: {
        body: {
            ...farineBranch1Kg
        }
    }
};


const gateauBranch1L = clon(farineBranch);
gateauBranch1L.quantity.unit = "L";
export const badUnitGetBranchSpec = {
    req: {
        url: `/api/branch/${gateauBranch1L.quantity.qt}/${gateauBranch1L.quantity.unit}/${gateauBranch1L._id}`
    },
    res: {
        code: 400,
        body: withError(3, "Units mismatch: 'L' and 'g'")
    }
};


const branchWithoutQt = clon(laitBranch);
export const branchWithoutQtSpec = {
    req: {
        url: `/api/branch/${branchWithoutQt.quantity.qt}/${branchWithoutQt.quantity.unit}/${branchWithoutQt._id}`
    },
    res: {
        body: {
            ...branchWithoutQt
        }
    }
};