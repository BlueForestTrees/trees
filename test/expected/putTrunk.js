import {oneModifiedResponse} from "./common";
import {leftTrunk} from "../data/database";
import {cols} from "../../src/const/collections";

const someNewName = "paPRika" + Math.random();

export const rename = {};

let _id = leftTrunk._id;
rename.req = {
    params: {_id},
    body: {
        name: someNewName
    }
};
rename.res = {
    body: oneModifiedResponse
};

rename.db = {
    expected: {
        colname: cols.TRUNK,
        doc: {
            _id,
            ...rename.req.body,
            name_lower: rename.req.body.name.toLowerCase()
        }
    }
};