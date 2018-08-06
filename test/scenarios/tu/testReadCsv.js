import fs from "fs"
import {parse, smartSplit} from "../../../src/util/csv"
import {expect} from 'chai'

const filename = "test/files/PETIT_BI_1.09__03_Procedes_Impacts.csv"

describe('csv', function () {
    it('parse an entire csv file', async () => {

        const impacts = await parse(fs.readFileSync(filename))

        const expectedImpacts = {
            "940bf6ef-aaae-4559-9dd3-0cd68d30b2f4": {"ec7836be-83eb-41da-bcda-1a6a3fe2d149": {quantity: {qt: 0.00175113}}, "865c4fbe-11cc-4905-9b0a-80a99d94f7e6": {quantity: {qt: 0.000000311443}}},
            "81cd479b-6536-40ac-be2a-ab18b6e79bb8": {"ec7836be-83eb-41da-bcda-1a6a3fe2d149": {quantity: {qt: 0.0000434245}}, "865c4fbe-11cc-4905-9b0a-80a99d94f7e6": {quantity: {qt: 0.0000000373707}}},
        }


        expect(impacts).to.deep.equal(expectedImpacts)
    })

    it('simple smartSplit', () => {
        expect(smartSplit('coucou;beau;mec', ";")).to.deep.equal(["coucou", "beau", "mec"])
    })
    it('complex smartSplit', () => {
        expect(smartSplit('"coucou;beau";mec', ";")).to.deep.equal(["coucou;beau", "mec"])
    })
})

