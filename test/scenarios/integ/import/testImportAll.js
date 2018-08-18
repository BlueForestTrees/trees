import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {init, request, withTest} from "test-api-express-mongo/dist/api"
import path from "path"
import {authGod} from "../../../database/users"

describe.skip('POST ALL', function () {
    
    beforeEach(init(api, ENV, cols))
    
    it('post all', withTest([
        {
            req: {
                url: "/api/trunkBulk/ademe",
                method: "POST",
                file: {
                    field: "xlsx.ademe.trunk",
                    path: path.resolve("test/files/BI_1.09__02_Procedes_Details.xlsx")
                },
                headers: {
                    ...authGod
                }
            }
        },
        {
            req: {
                url: "/api/impactEntryBulk/ademe",
                method: "POST",
                file: {
                    field: "xlsx.ademe.impactEntry",
                    path: path.resolve("test/files/BI_1.09__06_CatImpacts_Details.xlsx")
                },
                headers: {
                    ...authGod
                }
            }
        },
        {
            req: {
                url: "/api/impactBulk/ademe",
                method: "POST",
                file: {
                    field: "csv.ademe.impact",
                    path: path.resolve("test/files/BI_1.09__03_Procedes_Impacts.csv")
                },
                headers: {
                    ...authGod
                }
            }
        }
    ]))
})