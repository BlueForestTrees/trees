import _ from 'lodash';
import {clon} from "../../util/testUtil";
import {withoutQuantity, withQtCoef} from "../../util/testUtil";
import {farineBranch, laitBranch, pizzaTrunk} from "../../database/gateau";
import {withTrunkInfos} from "../../util/testIntegDatabase";

export const getBranchsSpec = {};
const farineItemsWithNames = withoutQuantity(withTrunkInfos(clon(farineBranch.items)));
getBranchsSpec.req = {
    _id: farineBranch._id
};
getBranchsSpec.res = {
    body: {
        ..._.omit(farineBranch, ["items", "quantity"]),
        items: farineItemsWithNames
    }
};

export const emptyGetBranchSpec = {};
emptyGetBranchSpec.req = {
    _id: pizzaTrunk._id
};
emptyGetBranchSpec.res = {
    body: {
        _id: pizzaTrunk._id,
        items: []
    }
};

export const sameQtGetBranchSpec = {};
const sameQtItems = withTrunkInfos(clon(farineBranch.items));
sameQtGetBranchSpec.req = {
    qt: farineBranch.quantity.qt,
    unit: farineBranch.quantity.unit,
    _id: farineBranch._id
};
sameQtGetBranchSpec.res = {
    body: {
        ..._.omit(farineBranch, "items"),
        items: sameQtItems
    }
};


export const farine1000GGetBranchSpec = {};
const farine1000G = clon(farineBranch);
withTrunkInfos(farine1000G.items);
withQtCoef([farine1000G]);
withQtCoef(farine1000G.items);

farine1000GGetBranchSpec.req = {
    qt: farine1000G.quantity.qt,
    unit: farine1000G.quantity.unit,
    _id: farine1000G._id
};
farine1000GGetBranchSpec.res = {
    body: {
        ...farine1000G
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

export const otherUnitGetBranchSpec = {};
const farineBranch1Kg = clon(farineBranch);
withTrunkInfos(farineBranch1Kg.items);
farineBranch1Kg.quantity.qt = 1;
farineBranch1Kg.quantity.unit = "kg";
withQtCoef(farineBranch1Kg.items,5);

otherUnitGetBranchSpec.req = {
    qt: farineBranch1Kg.quantity.qt,
    unit: farineBranch1Kg.quantity.unit,
    _id: farineBranch1Kg._id
};
otherUnitGetBranchSpec.res = {
    body: {
        ...farineBranch1Kg
    }
};


export const badUnitGetBranchSpec = {};
const gateauBranch1L = clon(farineBranch);
withTrunkInfos(gateauBranch1L.items);
gateauBranch1L.quantity.unit = "L";

badUnitGetBranchSpec.req = {
    qt: gateauBranch1L.quantity.qt,
    unit: gateauBranch1L.quantity.unit,
    _id: gateauBranch1L._id
};
badUnitGetBranchSpec.res = {
    status: 400,
    bodyMessage: "Units mismatch: 'L' and 'g'"
};


export const branchWithoutQtSpec = {};
const branchWithoutQt = clon(laitBranch);
withTrunkInfos(branchWithoutQt.items);

branchWithoutQtSpec.req = {
    _id: branchWithoutQt._id,
    qt: branchWithoutQt.quantity.qt,
    unit: branchWithoutQt.quantity.unit
};
branchWithoutQtSpec.res = {
    body: {
        ...branchWithoutQt
    }
};