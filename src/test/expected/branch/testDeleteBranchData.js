
// export const branchDeletionSpec = {};
//
// branchDeletionSpec.req = {
//     trunkId: gateauBranch._id,
//     branchId: gateauBranch.items[0]._id
// };
//
// branchDeletionSpec.res = {
//     expected: oneModifiedResponse
// };
//
// branchDeletionSpec.db = {
//     expected: {
//         colname: cols.BRANCH,
//         doc: remove(gateauBranch, "items", {_id: gateauBranch.items[0]._id})
//     }
// };
//
// export const bleBranchDeletionSpec = {};
//
// bleBranchDeletionSpec.req = {
//     trunkId: farineBranch._id,
//     branchId: farineBranch.items[0]._id
// };
//
// bleBranchDeletionSpec.res = {
//     expected: oneModifiedResponse
// };
//
// bleBranchDeletionSpec.db = {
//     expected: {
//         colname: cols.BRANCH,
//         doc: remove(farineBranch, "items", {_id: farineBranch.items[0]._id})
//     }
// };