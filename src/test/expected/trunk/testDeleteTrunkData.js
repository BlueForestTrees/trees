import {gateau} from "../../scenario/integ/testIntegDatabase";
import {cols} from "../../../main/const/collections";

export const deletion = {};

const _id = gateau._id;

deletion.req = {
    _id
};

deletion.db = {
    expected: {
        colname: cols.TRUNK,
        missingDoc: {_id}
    }
};