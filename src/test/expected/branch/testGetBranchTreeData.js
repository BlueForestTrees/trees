import {aTrunk} from "../../database/lettres";

// export const gateauBranchTreeSpec = {};
// const gateauBranch2Kg = clon(gateauBranch);
// //on fait x4 sur la quantité
// gateauBranch2Kg.quantity.qt = 2;
// gateauBranch2Kg.quantity.unit = "kg";
// withDoubleQt(withDoubleQt(gateauBranch2Kg.items));
// //on ajoute le blé à la farine
// gateauBranch2Kg.items[0].items = [{_id: bleTrunk._id}];
//
// gateauBranchTreeSpec.req = {
//     qt: gateauBranch2Kg.quantity.qt,
//     unit: gateauBranch2Kg.quantity.unit,
//     _id: gateauBranch2Kg._id
// };
// gateauBranchTreeSpec.res = {
//     body: {
//         ...gateauBranch2Kg
//     }
// };
//

export const noBranchsTreeSpec = {};
noBranchsTreeSpec.req = {
    qt: 10,
    unit: "kg",
    _id: aTrunk._id
};
noBranchsTreeSpec.res = {
    body: {
        _id: aTrunk._id,
        quantity: {
            qt: 10,
            unit: "kg"
        },
        items: []
    }
};