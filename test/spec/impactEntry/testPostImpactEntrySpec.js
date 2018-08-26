import {createObjectId} from "test-api-express-mongo/dist/util"

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