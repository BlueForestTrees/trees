import {cols} from "./collections"
import {col} from "mongo-registry"

export const registry = [
    {
        version: "0.0.3",
        log: "ImpactEntry.externId is unique",
        script: () => col(cols.IMPACT_ENTRY).createIndex({"externId": 1}, {unique: true, partialFilterExpression: {externId: {$exists: true}}})
    },
    {
        version: "1.0.6",
        log: "index: TrunkCollection.externId",
        script: () => col(cols.TRUNK).createIndex({"externId": 1})
    },
    {
        version: "1.1.5",
        log: "search (name, stores) IDX",
        script: () => col(cols.TRUNK).createIndex({name: 1, stores: 1})
    }
]