import {oneModifiedResponse} from "../testCommonData";
import {cols} from "../../../main/const/collections";
import {remove} from "../../util/testIntegUtil";
import {bleBranch, farineBranch} from "../../database/gateau";

export const branchDeletionSpec = {};

branchDeletionSpec.req = {
    trunkId: farineBranch._id,
    branchId: farineBranch.items[0]._id
};

branchDeletionSpec.res = {
    expected: oneModifiedResponse
};

branchDeletionSpec.db = {
    expected: {
        colname: cols.BRANCH,
        doc: remove(farineBranch, "items", {_id: farineBranch.items[0]._id})
    }
};

export const farineBranchDeletionSpec = {};

farineBranchDeletionSpec.req = {
    trunkId: bleBranch._id,
    branchId: bleBranch.items[0]._id
};

farineBranchDeletionSpec.res = {
    expected: oneModifiedResponse
};

farineBranchDeletionSpec.db = {
    expected: {
        colname: cols.BRANCH,
        doc: remove(bleBranch, "items", {_id: bleBranch.items[0]._id})
    }
};