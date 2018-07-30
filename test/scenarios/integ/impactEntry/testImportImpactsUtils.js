import {initServices} from "../../../../src/services"
import {ademeToBlueforest, ademeUnitToGrandeurEq} from "../../../../src/service/impactEntry/postImpactEntryService"
import {expect} from "chai"
import {countFromDbByDoc} from "trees-test/dist/db"

describe('Imports utils', function () {

    beforeEach(initServices)

    it('convert ademe unit to blueforest unit', () => {
        expect(ademeUnitToGrandeurEq("kg éq. CO2")).to.deep.equal({grandeur: "Mass", eq: "CO2"})
        expect(ademeUnitToGrandeurEq("kg éq.CO2")).to.deep.equal({grandeur: "Mass", eq: "CO2"})
        expect(ademeUnitToGrandeurEq("kg")).to.deep.equal({grandeur: "Mass"})
    })

    it('convert ademe impact parse to blueforest impact', () => {
        const ademe = {
            externId: '370960f4-0a3a-415d-bf3e-e5ce63160bb9',
            nom: 'Changement climatique',
            'nom origine ILCD': 'ILCD2011; Climate change; midpoint; GWP100; IPCC2007',
            commentaire: 'Factors issued from the baseline model of the IPCC (2007)',
            'Niveau de recommendation': 'I',
            unit: 'kg éq. CO2',
            unitDescription: 'Mass CO2-equivalents',
            referenceYear: 'no time reference',
            validUntil: '100 years',
            dataSource: ['IPCC (2007)'],
            dataSourceOrigin: 'IPCC (2007)',
            commanditaire: ['Intergovernmental Panel on Climate Change'],
            datasetFormat: 'ILCD format',
            datasetVersion: '01.00.000'
        }
        const blueforest = {
            _id: null,
            "externId": "370960f4-0a3a-415d-bf3e-e5ce63160bb9",
            name: ademe.nom,
            name_lower: ademe.nom.toLowerCase(),
            grandeur: "Mass",
            eq: "CO2",
            color: "#696969",
            origin: "ADEME",
            raw: ademe
        }
        expect(ademeToBlueforest([ademe])).to.deep.equal([blueforest])
    })
})