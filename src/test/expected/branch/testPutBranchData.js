// import {oneModifiedResponse} from "../testCommonData";
// import {clon} from "../../util/testUtil";
// import {cols} from "../../../main/const/collections";
// import _ from 'lodash';
// import {bleTrunk, farineTrunk, gateauTrunk, gateauBranch, laitTrunk} from "../../database/gateau";
// import {setQuantity} from "../../testPlumbing";
//
// export const existingIdsNewQtsSpec = {};
// const bleId = bleTrunk._id;
// const farineId = farineTrunk._id;
// existingIdsNewQtsSpec.req = {
//     body: {
//         trunk: {
//             _id: bleId,
//             quantity: {
//                 unit: "min",
//                 qt: 20
//             }
//         },
//         branch: {
//             _id: farineId,
//             quantity: {
//                 unit: "kg",
//                 qt: 10
//             }
//         }
//     }
// };
// existingIdsNewQtsSpec.res = {
//     body: oneModifiedResponse
// };
// existingIdsNewQtsSpec.db = {
//     expected: {
//         colname: cols.BRANCH,
//         doc: {
//             _id: bleId,
//             quantity: existingIdsNewQtsSpec.req.body.trunk.quantity,
//             items: [
//                 {
//                     "_id": farineTrunk._id,
//                     quantity: existingIdsNewQtsSpec.req.body.branch.quantity,
//                 }
//             ],
//
//         }
//     }
// };
//
//
// export const existingIdsAndQtsSpec = {};
// const updatedBranchs = clon(gateauBranch.items);
// setQuantity(updatedBranchs[1], 60);
//
// existingIdsAndQtsSpec.req = {
//     body: {
//         trunk: {
//             _id: gateauTrunk._id,
//             quantity: {
//                 unit: "g",
//                 qt: 250
//             }
//         },
//         branch: {
//             _id: laitTrunk._id,
//             quantity: {
//                 unit: "L",
//                 qt: 30
//             }
//         }
//     }
// };
// existingIdsAndQtsSpec.res = {
//     body: oneModifiedResponse
// };
// existingIdsAndQtsSpec.db = {
//     expected: {
//         colname: cols.BRANCH,
//         doc: {
//             ...(_.omit(gateauBranch, "items")),
//             items: updatedBranchs,
//         }
//     }
// };
//
// export const existingsAndUnitChangeSpec = {};
// const updatedBranchsWithDifferentUnit = clon(gateauBranch.items);
// setQuantity(updatedBranchsWithDifferentUnit[1], 250, "g");
//
// existingsAndUnitChangeSpec.req = {
//     body: {
//         trunk: {
//             _id: gateauTrunk._id,
//             quantity: {
//                 unit: "kg",
//                 qt: 1
//             }
//         },
//         branch: {
//             _id: laitTrunk._id,
//             quantity: {
//                 unit: "g",
//                 qt: 500
//             }
//         }
//     }
// };
// existingsAndUnitChangeSpec.res = {
//     body: oneModifiedResponse
// };
// existingsAndUnitChangeSpec.db = {
//     expected: {
//         colname: cols.BRANCH,
//         doc: {
//             ...(_.omit(gateauBranch, "items")),
//             items: updatedBranchsWithDifferentUnit,
//         }
//     }
// };
