import {cols} from "../const/collections";
import {col} from "./db";

export const registry = [
    {
        version: "0.0.1",
        log: "User.mail: index unique",
        script: () => col(cols.USER).createIndex({"mail": 1}, {unique: true})
    }
];