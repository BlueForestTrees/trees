import {init} from "trees-test/dist/api"
import {importAdemeEntries} from "../../../../src/service/impactEntry/postImpactEntryService"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import path from 'path'
import {expect} from "chai"
import {countFromDbByDoc} from "trees-test/dist/db"
import api from "../../../../src"

describe('Imports', function () {

    beforeEach(init(api, ENV, cols))

    it('first impact imports', async () => {
        await importAdemeEntries(path.resolve("test/files/BI_1.09__06_CatImpacts_Details.xlsx"))
        expect(await countFromDbByDoc(cols.IMPACT_ENTRY, {origin: "ADEME"})).to.equal(27)
    })
    it('two impact imports', async () => {
        await importAdemeEntries(path.resolve("test/files/BI_1.09__06_CatImpacts_Details.xlsx"))
        //TODO devrait pouvoir importer plusieurs fois de suite sans doublon!
        // await importAdemeEntries(path.resolve("test/files/BI_1.09__06_CatImpacts_Details.xlsx"))

        expect(await countFromDbByDoc(cols.IMPACT_ENTRY, {origin: "ADEME"})).to.equal(27)
    })


})