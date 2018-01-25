import {initialDB} from "../data/initialDB";
import {cols} from "../../src/const/collections";

const existingId = initialDB[cols.TREES][0]._id;
const someNewName = "paprika" + Math.random();
const oneModifiedResponse = {n: 1, nModified: 1, ok: 1};

export const rename = {
    _id: existingId,
    put: {
        body: {
            name: someNewName
        },
        expected: oneModifiedResponse
    },
    post: {
        expected: _id => ({
            _id,
            name: someNewName
        })
    }
};