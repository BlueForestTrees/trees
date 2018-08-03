import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import {AllreadyExistError} from "../../exceptions/Errors"
import {parse} from "../../util/excel"
import {grandeur} from "unit-manip"
import {map} from 'lodash'
import {createObjectId} from "mongo-queries-blueforest"

const impactsEntry = () => col(cols.IMPACT_ENTRY)

export const addImpactEntry = entry => impactsEntry().insertOne({...entry, name_lower: entry.name.toLowerCase()})

const parseDesc = {
    firstDocAt: 3,
    fields: [
        {idx: 3, fieldName: "externId"},
        {idx: 4, fieldName: "nom"},
        {idx: 6, fieldName: "nom origine ILCD"},
        {idx: 10, fieldName: "commentaire"},
        {idx: 11, fieldName: "Niveau de recommendation"},
        {idx: 13, fieldName: "Unité de référence"},
        {idx: 14, fieldName: "unitDescription"},
        {idx: 16, fieldName: "referenceYear"},
        {idx: 17, fieldName: "validUntil"},
        {idx: 24, fieldName: "dataSource", type: "array", sep: "; "},
        {idx: 37, fieldName: "dataSourceOrigin"},
        {idx: 32, fieldName: "commanditaire", type: "array", sep: ", "},
        {idx: 36, fieldName: "datasetFormat"},
        {idx: 39, fieldName: "datasetVersion"},
    ]
}

export const ademeToBlueforestImpact = raws => map(raws, raw => {
    console.log(raw)
    return ({
    updateOne: {
        filter: {externId: raw.externId},
        update: {
            $set: {
                externId: raw.externId,
                name: raw.nom,
                name_lower: raw.nom.toLowerCase(),
                ...ademeUnitToGrandeurEq(raw['Unité de référence']),
                color: "#696969",
                origin: "ADEME",
                raw
            }
        },
        upsert: true
    }
    })
})

export const ademeUnitToGrandeurEq = ademeUnit => {
    // if (!ademeUnit) return null
    const splitted = ademeUnit.split("éq.")
    if (splitted.length === 1) {
        return {grandeur: grandeur(ademeUnit)}
    } else if (splitted.length === 2) {
        return {grandeur: grandeur(splitted[0].trim()), eq: splitted[1].trim()}
    }
}

export const importAdemeImpactEntries = async buffer => {
    const result = await impactsEntry().bulkWrite(ademeToBlueforestImpact(await parse(buffer, parseDesc)), {ordered: false})
    return {
        ok: result.ok === 1,
        insertions: result.nInserted,
        upsertions: result.nUpserted,
        matches: result.nMatched,
        modifieds: result.nModified,
        removeds: result.nRemoved
    }
}