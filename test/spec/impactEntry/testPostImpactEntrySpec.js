import {cols} from "../../../src/const/collections"
import {createObjectId} from "test-api-express-mongo/dist/util"
import path from "path"
import {authGod} from "../../database/users"



export const postBadGrandeurImpactEntrySpec = {
    req: {
        url: "/api/impactEntry",
        method: "POST",
        body: {
            name: "nomNewImpactEntry",
            g: "Dens   ité"
        }
    },
    res: {
        code: 400,
        bodypath: {path: "$.errors.g.msg", value: "should be Mass, Dens, Long, Tran..."}
    }
}

export const postAdemeImpactEntryFileSpec = {
    req: {
        url: "/api/impactEntryBulk/ademe",
        method: "POST",
        headers: authGod,
        file: {
            field: "xlsx.ademe.impactEntry",
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