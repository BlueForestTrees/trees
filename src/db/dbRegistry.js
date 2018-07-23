import {cols} from "../const/collections";
import {col} from "trees-db-version/dist";
import {userStatus} from "../const/userStatus";
import sha1 from "sha1";

export const registry = [
    {
        version: "0.0.1",
        log: "User.mail: index unique",
        script: () => col(cols.USER).createIndex({"mail": 1}, {unique: true})
    },
    {
        version: "0.0.2",
        log: "User admin",
        script: () => col(cols.USER).insertOne({
            status: userStatus.CONFIRMED,
            mail: "admin@bf.org",
            fullname: "Admin BlueForest",
            wantSuscribeDate: new Date(),
            confirmDate: new Date(),
            password: sha1("tirlititi"),
            clearpassword: "tirlititi",
            color: "#1565c0",
            god: true
        })
    },
    {
        version: "0.0.2",
        log: "User non admin",
        script: () => col(cols.USER).insertOne({
            status: userStatus.CONFIRMED,
            mail: "user@bf.org",
            fullname: "User BlueForest",
            wantSuscribeDate: new Date(),
            confirmDate: new Date(),
            password: sha1("tirlititi"),
            clearpassword: "tirlititi",
            color: "#1565c0"
        })
    }
];