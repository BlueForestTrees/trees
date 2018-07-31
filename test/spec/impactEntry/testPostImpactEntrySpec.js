import {withError} from "trees-test/dist/domain"
import _ from 'lodash'
import {vitCImpactEntry} from "../../database/impactEntries"
import {cols} from "../../../src/const/collections"
import {createStringObjectId} from "trees-test/dist/util"
import path from "path"

const impactEntry = {
    _id: createStringObjectId(),
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
const badImpactEntry = {
    _id: createStringObjectId() + "984",
    name: "nomNewImpactEntry",
    grandeur: "Dens",
    color: "#FFFFFF"
}
export const postBadIdImpactEntrySpec = {
    req: {
        url: `/api/impactEntry`,
        method: "POST",
        body: badImpactEntry
    },
    res: {
        code: 400,
        bodypath: {path: "$.errors._id.msg", value: "invalid"}
    },
    db: {
        expected: {
            colname: cols.IMPACT_ENTRY,
            missingDoc: badImpactEntry
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
        bodypath: {path: "$.errors.grandeur.msg", value: "Invalid value"}
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
            {path: "$.ok", value: true},
            {path: "$.upsertions", value: 27},
            {path: "$.insertions", value: 0},
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