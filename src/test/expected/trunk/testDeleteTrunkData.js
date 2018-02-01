import {trunkQtRootsQt} from "../../scenario/integ/testIntegDatabase";
import {cols} from "../../../main/const/collections";

export const deletion = {};

const _id = trunkQtRootsQt._id;

deletion.req = {
    _id
};

deletion.db = {
    expected: {
        colname: cols.TRUNK,
        missingDoc: {_id}
    }
};