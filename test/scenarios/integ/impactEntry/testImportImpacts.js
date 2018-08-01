import {init} from "api-test/dist/api"
import {importAdemeEntries} from "../../../../src/service/impactEntry/postImpactEntryService"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import path from 'path'
import {expect} from "chai"
import {countFromDbByDoc} from "api-test/dist/db"
import api from "../../../../src"
import fs from 'fs'

describe('Imports', function () {
    const impactBuffer = fs.readFileSync(path.resolve("test/files/BI_1.09__06_CatImpacts_Details.xlsx"))

    beforeEach(init(api, ENV, cols))

    it('first impact imports', async () => {
        await importAdemeEntries(impactBuffer)
        expect(await countFromDbByDoc(cols.IMPACT_ENTRY, {origin: "ADEME"})).to.equal(27)
    })
    it('two impact imports', async () => {
        await importAdemeEntries(impactBuffer)
        await importAdemeEntries(impactBuffer)

        expect(await countFromDbByDoc(cols.IMPACT_ENTRY, {origin: "ADEME"})).to.equal(27)
    })


})