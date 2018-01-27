import {topTrunkQt} from "../data/database";
import {cols} from "../../src/const/collections";

export const deletion = {};

const _id = topTrunkQt._id;

deletion.req = {
    _id
};

deletion.db = {
    expected: {
        colname: cols.TRUNK,
        missingDoc: {_id}
    }
};