import {gateau} from "../../scenario/integ/testIntegDatabase";
import {cols} from "../../../main/const/collections";

export const trunkDeletionSpec = {};

const _id = gateau._id;

trunkDeletionSpec.req = {
    _id
};

trunkDeletionSpec.db = {
    expected: {
        colname: cols.TRUNK,
        missingDoc: {_id}
    }
};