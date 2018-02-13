import {cols} from "../../../main/const/collections";
import {gateau} from "../../database/gateau";

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