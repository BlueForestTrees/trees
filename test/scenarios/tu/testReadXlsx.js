import Excel from "exceljs"

import {expect} from "chai"
import {mapFromDescription, parse, parseDocument} from "../../../src/util/excel"

describe('xlsx read', function () {

    const filename = "test/files/BI_1.09__06_CatImpacts_Details.xlsx"

    it('read cell A1 value', () => {
        const workbook = new Excel.Workbook()
        return workbook.xlsx.readFile(filename)
            .then(() => {
                expect(workbook.getWorksheet(1).getCell("A1").value).to.equal(" Informations sur la catégorie d'impact ")
            })
    })

    it('read column 3 line 3', () => {
        const workbook = new Excel.Workbook()
        return workbook.xlsx.readFile(filename)
            .then(() => {
                const column = workbook.getWorksheet(1).getColumn(3).values
                expect(column[5]).to.equal(" Photochemical ozone formation ")
            })
    })

    it('read column 1', () => {
        const workbook = new Excel.Workbook()
        return workbook.xlsx.readFile(filename)
            .then(() => {
                const headerColumnIdx = 1
                const column = workbook.getWorksheet(1).getColumn(headerColumnIdx).values
                console.log(column)
            })
    })

    it('build map from column', () => {
        const fields = [
            {fieldName: "externId", xlsName: " UUID "},
            {fieldName: "nom", xlsName: " Nom français "},
            {fieldName: "Niveau de recommendation", xlsName: " Niveau de recommandation "}
        ]
        const expectedMap = [
            {fieldName: "externId", xlsName: " UUID ", idx: 3},
            {fieldName: "nom", xlsName: " Nom français ", idx: 4},
            {fieldName: "Niveau de recommendation", xlsName: " Niveau de recommandation ", idx: 11}
        ]

        const workbook = new Excel.Workbook()
        return workbook.xlsx.readFile(filename).then(() => {
            expect(mapFromDescription(workbook, fields)).to.deep.equal(expectedMap)
        })
    })

    it('build an impact from file & fileDescription', () => {
        const fields = [
            {fieldName: "externId", xlsName: " UUID "},
            {fieldName: "nom", xlsName: " Nom français "},
            {fieldName: "nom origine ILCD", xlsName: " Nom origine ILCD "},
            {fieldName: "commentaire", xlsName: " Commentaire Général "},
            {fieldName: "Niveau de recommendation", xlsName: " Niveau de recommandation "},
            {fieldName: "unit", xlsName: " Unité de référence "},
            {fieldName: "unitDescription", xlsName: " Description "},
            {fieldName: "referenceYear", xlsName: " Année de référence "},
            {fieldName: "validUntil", xlsName: " Jeu de données valable jusqu'au "},
            {fieldName: "dataSource", xlsName: " Source des données utilisées ", type: "array", sep: "; "},
            {fieldName: "dataSourceOrigin", xlsName: " Origine du jeu de données "},
            {fieldName: "commanditaire", xlsName: " Commanditaire ", type: "array", sep: ", "},
            {fieldName: "datasetFormat", xlsName: " Format du jeu de données "},
            {fieldName: "datasetVersion", xlsName: " Version du dataset "},
        ]
        const expectedObject = {
            externId: "ec7836be-83eb-41da-bcda-1a6a3fe2d149",
            nom: "Formation d'ozone photochimique",
            "nom origine ILCD": "ILCD2011; Photochemical ozone formation; midpoint - human health; POCP; Van Zelm et al. (2008)",
            "commentaire": "Only for Europe. Includes spatial differentiation.",
            "Niveau de recommendation": "II",
            unit: "kg éq. C2H4",
            unitDescription: "Mass C2H4-equivalents",
            referenceYear: "2009",
            validUntil: "indefinite",
            dataSource: ["Van Zelm et al. (2008)"],
            commanditaire: ["Ministry of Housing", "Spatial Planning and Environment (VROM)"],
            datasetFormat: "ILCD format",
            "dataSourceOrigin": "Van Zelm et al. (2008)",
            "datasetVersion": "01.00.000"
        }
        const workbook = new Excel.Workbook()
        return workbook.xlsx.readFile(filename).then(() => {
            const map = mapFromDescription(workbook, fields)
            expect(parseDocument(workbook, map, 3)).to.deep.equal(expectedObject)
        })
    })

    it('parse an entire impact file', async () => {
        const parseDesc = {
            firstDocAt: 3,
            fields: [
                {fieldName: "externId", xlsName: " UUID "},
                {fieldName: "nom", xlsName: " Nom français "},
                {fieldName: "nom origine ILCD", xlsName: " Nom origine ILCD "},
                {fieldName: "commentaire", xlsName: " Commentaire Général "},
                {fieldName: "Niveau de recommendation", xlsName: " Niveau de recommandation "},
                {fieldName: "unit", xlsName: " Unité de référence "},
                {fieldName: "unitDescription", xlsName: " Description "},
                {fieldName: "referenceYear", xlsName: " Année de référence "},
                {fieldName: "validUntil", xlsName: " Jeu de données valable jusqu'au "},
                {fieldName: "dataSource", xlsName: " Source des données utilisées ", type: "array", sep: "; "},
                {fieldName: "dataSourceOrigin", xlsName: " Origine du jeu de données "},
                {fieldName: "commanditaire", xlsName: " Commanditaire ", type: "array", sep: ", "},
                {fieldName: "datasetFormat", xlsName: " Format du jeu de données "},
                {fieldName: "datasetVersion", xlsName: " Version du dataset "},
            ]
        }

        const docs = await parse(filename, parseDesc)

        expect(docs.length).to.equal(27)
        expect(docs[1].externId).to.equal("865c4fbe-11cc-4905-9b0a-80a99d94f7e6")
        expect(docs[docs.length - 1].externId).to.equal("b49c662d-4662-4944-a80a-093dd03d3f4f")
    })
})