import {cols} from "../../../main/const/collections";
import {gateauTrunk} from "../../database/gateau";

export const trunkDeletionSpec = {};

const _id = gateauTrunk._id;

trunkDeletionSpec.req = {
    _id
};

trunkDeletionSpec.db = {
    expected: {
        colname: cols.TRUNK,
        missingDoc: {_id}
    }
};