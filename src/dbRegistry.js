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
    }, {
        version: "1.1.4",
        log: "index: text name, store, categories_tags",
        script: () => col(cols.TRUNK).createIndex({categories_tags:"text", name:"text", stores:"text"})
    },

]