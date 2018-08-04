import {withError} from "test-api-express-mongo/dist/domain"
import _ from 'lodash'
import {vitCImpactEntry} from "../../database/impactEntries"
import {cols} from "../../../src/const/collections"
import {createObjectId} from "test-api-express-mongo/dist/util"
import path from "path"

const impactEntry = {
    _id: createObjectId(),
    name: "nomNewImpactEntry",
    grandeur: "Dens",
    color: "#FFFFFF"
}
export const postImpactEntrySpec = {
    req: {
        url: `/api/impactEntry`,
        method: "POST",
        body: impactEntry
    },
    db: {
        expected: {
            colname: cols.IMPACT_ENTRY,
            doc: {
                ...impactEntry,
                name_lower: impactEntry.name.toLowerCase()
            }
        }
    }
}

export const postBadGrandeurImpactEntrySpec = {
    req: {
        url: "/api/impactEntry",
        method: "POST",
        body: {
            name: "nomNewImpactEntry",
            grandeur: "Dens   ité"
        }
    },
    res: {
        code: 400,
        bodypath: {path: "$.errors.grandeur.msg", value: ["Invalid value"]}
    }
}

export const postAdemeImpactFileSpec = {
    req: {
        url: "/api/impactEntryBulk/ademe",
        method: "POST",
        file: {
            field: "xlsx.ademe.impact",
            path: path.resolve("test/files/BI_1.09__06_CatImpacts_Details.xlsx")
        }
    },
    res: {
        bodypath: [
            {path: "$.ok", value: [true]},
            {path: "$.upsertions", value: [27]},
            {path: "$.insertions", value: [0]},
        ]
    }
}


export const allreadyExistingImpactEntrySpec = {
    req: {
        url: "/api/impactEntry",
        method: "POST",
        body: {
            ..._.omit(vitCImpactEntry, ["name_lower"])
        }
    },
    res: {
        code: 400,
        body: withError(1,"allready exists")
    }
}