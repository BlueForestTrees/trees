import {cols} from "./collections"
import {col} from "mongo-registry"

export const registry = [
    {
        version: "0.0.3",
        log: "ImpactEntry.externId is unique",
        script: () => col(cols.IMPACT_ENTRY).createIndex({"externId": 1}, {unique: true, partialFilterExpression: {externId: {$exists: true}}})
    }
]