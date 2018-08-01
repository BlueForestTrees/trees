import {cols} from "../const/collections"
import {col} from "mongo-registry/dist"
import {userStatus} from "../const/userStatus"
import sha1 from "sha1"

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
    },
    {
        version: "0.0.3",
        log: "ImpactEntry.externId is unique",
        script: () => col(cols.IMPACT_ENTRY).createIndex({"externId": 1}, {unique: true, partialFilterExpression: {externId: {$exists: true}}})
    }
]