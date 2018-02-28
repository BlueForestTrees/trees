import _ from 'lodash';
import {clon} from "../../util/testUtil";
import {setQuantity, withoutQuantity, withQtCoef} from "../../testPlumbing";
import {farineBranch, laitBranch, pizzaTrunk} from "../../database/gateau";
import {withNames} from "../../testIntegDatabase";

export const getBranchsSpec = {};
const farineItemsWithNames = withoutQuantity(withNames(clon(farineBranch.items)));
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
const sameQtItems = withNames(clon(farineBranch.items));
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
withNames(farine1000G.items);
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
withNames(farineBranch1Kg.items);
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
withNames(gateauBranch1L.items);
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
withNames(branchWithoutQt.items);

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
//
// export const papierAGetBranchSpec = {};
// papierAGetBranchSpec.req = {
//     _id:papierVA._id, qt: 100,unit: "m2"
// };
// papierAGetBranchSpec.res = {
//     body: {
//         ...withItem(papierVA._id, 100, "m2"),
//         items:[
//             withItem(couchePE._id, 780,"kg"),
//             withItem(couchePapier._id, 2070,"kg"),
//             withItem(coucheAdhesif._id, 80,"kg"),
//             withItem(coucheAlu._id, 890,"kg")
//         ]
//     }
// };
//
// export const lettreGetBranchSpec = {};
// lettreGetBranchSpec.req = {
//     qt: 500,
//     unit: "g",
//     _id: aTrunk._id
// };
// lettreGetBranchSpec.res = {
//     body: {
//         _id:aTrunk._id,
//         items:[
//             {
//                 "_id": "bbbbbbbbbbbbbbbbbbbbbbbb",
//                 "items": [
//                     {
//                         "_id": "babababababababababababa",
//                         "items": [
//                             {
//                                 "_id": "baabaabaabaabaabaabaabaa",
//                                 "items": [
//                                     {
//                                         "_id": "e1e1e1e1e1e1e1e1e1e1e1e1",
//                                         "quantity": {
//                                             "qt": 5,
//                                             "unit": "L"
//                                         }
//                                     }
//                                 ],
//                                 "quantity": {
//                                     "qt": 0.5,
//                                     "unit": "kg"
//                                 }
//                             },
//                             {
//                                 "_id": "babbabbabbabbabbabbabbab",
//                                 "items": [
//                                     {
//                                         "_id": "e1e1e1e1e1e1e1e1e1e1e1e1",
//                                         "quantity": {
//                                             "qt": 0.25,
//                                             "unit": "m3"
//                                         }
//                                     }
//                                 ],
//                                 "quantity": {
//                                     "qt": 0.5,
//                                     "unit": "kg"
//                                 }
//                             }
//                         ],
//                         "quantity": {
//                             "qt": 0.5,
//                             "unit": "kg"
//                         }
//                     },
//                     {
//                         "_id": "b2b2b2b2b2b2b2b2b2b2b2b2",
//                         "items": [
//                             {
//                                 "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
//                                 "quantity": {
//                                     "qt": 0.5,
//                                     "unit": "kg"
//                                 }
//                             }
//                         ],
//                         "quantity": {
//                             "qt": 0.5,
//                             "unit": "kg"
//                         }
//                     }
//                 ],
//                 "quantity": {
//                     "qt": 0.5,
//                     "unit": "kg"
//                 }
//             },
//             {
//                 "_id": "cccccccccccccccccccccccc",
//                 "items": [
//                     {
//                         "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
//                         "quantity": {
//                             "qt": 0.5,
//                             "unit": "kg"
//                         }
//                     }
//                 ],
//                 "quantity": {
//                     "qt": 0.5,
//                     "unit": "kg"
//                 }
//             },
//             {
//                 "_id": "dddddddddddddddddddddddd",
//                 "items": [
//                     {
//                         "_id": "dadadadadadadadadadadada",
//                         "items": [
//                             {
//                                 "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
//                                 "quantity": {
//                                     "qt": 0.5,
//                                     "unit": "kg"
//                                 }
//                             }
//                         ],
//                         "quantity": {
//                             "qt": 0.5,
//                             "unit": "kg"
//                         }
//                     },
//                     {
//                         "_id": "dbdbdbdbdbdbdbdbdbdbdbdb",
//                         "items": [
//                             {
//                                 "_id": "dbadbadbadbadbadbadbadba",
//                                 "items": [
//                                     {
//                                         "_id": "dbaadbaadbaadbaadbaadbaa",
//                                         "items": [
//                                             {
//                                                 "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
//                                                 "quantity": {
//                                                     "qt": 1,
//                                                     "unit": "kg"
//                                                 }
//                                             }
//                                         ],
//                                         "quantity": {
//                                             "qt": 0.5,
//                                             "unit": "kg"
//                                         }
//                                     }
//                                 ],
//                                 "quantity": {
//                                     "qt": 0.5,
//                                     "unit": "kg"
//                                 }
//                             }
//                         ],
//                         "quantity": {
//                             "qt": 0.5,
//                             "unit": "kg"
//                         }
//                     }
//                 ],
//                 "quantity": {
//                     "qt": 0.5,
//                     "unit": "kg"
//                 }
//             }
//         ],
//         "quantity": {
//             qt: 500,
//             unit: "g"
//         }
//     }
// };
//
// export const lettreNoDaQtGetBranchSpec = {};
// lettreNoDaQtGetBranchSpec.req = {
//     qt: 500,
//     unit: "g",
//     _id: aTrunk._id
// };
// lettreNoDaQtGetBranchSpec.db = {
//     preChange: {
//         colname: cols.BRANCH,
//         doc: {
//             ...removeItemQuantity(clon(dBranch), daTrunk._id)
//         }
//     }
// };
// lettreNoDaQtGetBranchSpec.res = {
//     body: {
//         _id:aTrunk._id,
//         items:[
//             {
//                 "_id": "bbbbbbbbbbbbbbbbbbbbbbbb",
//                 "items": [
//                     {
//                         "_id": "babababababababababababa",
//                         "items": [
//                             {
//                                 "_id": "baabaabaabaabaabaabaabaa",
//                                 "items": [
//                                     {
//                                         "_id": "e1e1e1e1e1e1e1e1e1e1e1e1",
//                                         "quantity": {
//                                             "qt": 5,
//                                             "unit": "L"
//                                         }
//                                     }
//                                 ],
//                                 "quantity": {
//                                     "qt": 0.5,
//                                     "unit": "kg"
//                                 }
//                             },
//                             {
//                                 "_id": "babbabbabbabbabbabbabbab",
//                                 "items": [
//                                     {
//                                         "_id": "e1e1e1e1e1e1e1e1e1e1e1e1",
//                                         "quantity": {
//                                             "qt": 0.25,
//                                             "unit": "m3"
//                                         }
//                                     }
//                                 ],
//                                 "quantity": {
//                                     "qt": 0.5,
//                                     "unit": "kg"
//                                 }
//                             }
//                         ],
//                         "quantity": {
//                             "qt": 0.5,
//                             "unit": "kg"
//                         }
//                     },
//                     {
//                         "_id": "b2b2b2b2b2b2b2b2b2b2b2b2",
//                         "items": [
//                             {
//                                 "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
//                                 "quantity": {
//                                     "qt": 0.5,
//                                     "unit": "kg"
//                                 }
//                             }
//                         ],
//                         "quantity": {
//                             "qt": 0.5,
//                             "unit": "kg"
//                         }
//                     }
//                 ],
//                 "quantity": {
//                     "qt": 0.5,
//                     "unit": "kg"
//                 }
//             },
//             {
//                 "_id": "cccccccccccccccccccccccc",
//                 "items": [
//                     {
//                         "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
//                         "quantity": {
//                             "qt": 0.5,
//                             "unit": "kg"
//                         }
//                     }
//                 ],
//                 "quantity": {
//                     "qt": 0.5,
//                     "unit": "kg"
//                 }
//             },
//             {
//                 "_id": "dddddddddddddddddddddddd",
//                 "items": [
//                     {
//                         "_id": "dadadadadadadadadadadada",
//                         "items": [
//                             {
//                                 "_id": "e2e2e2e2e2e2e2e2e2e2e2e2"
//                             }
//                         ]
//                     },
//                     {
//                         "_id": "dbdbdbdbdbdbdbdbdbdbdbdb",
//                         "items": [
//                             {
//                                 "_id": "dbadbadbadbadbadbadbadba",
//                                 "items": [
//                                     {
//                                         "_id": "dbaadbaadbaadbaadbaadbaa",
//                                         "items": [
//                                             {
//                                                 "_id": "e2e2e2e2e2e2e2e2e2e2e2e2",
//                                                 "quantity": {
//                                                     "qt": 1,
//                                                     "unit": "kg"
//                                                 }
//                                             }
//                                         ],
//                                         "quantity": {
//                                             "qt": 0.5,
//                                             "unit": "kg"
//                                         }
//                                     }
//                                 ],
//                                 "quantity": {
//                                     "qt": 0.5,
//                                     "unit": "kg"
//                                 }
//                             }
//                         ],
//                         "quantity": {
//                             "qt": 0.5,
//                             "unit": "kg"
//                         }
//                     }
//                 ],
//                 "quantity": {
//                     "qt": 0.5,
//                     "unit": "kg"
//                 }
//             }
//         ],
//         "quantity": {
//             qt: 500,
//             unit: "g"
//         }
//     }
// };
