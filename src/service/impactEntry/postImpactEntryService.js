import {cols} from "../../const/collections"
import {col} from "trees-db-version/dist"
import {AllreadyExistError} from "../../exceptions/Errors"
import {parse} from "../../util/excel"
import {grandeur} from "trees-units"
import {map} from 'lodash'
import {createObjectId} from "trees-query"

const impactsEntry = () => col(cols.IMPACT_ENTRY)

export const addImpactEntry = entry => impactsEntry().insertOne({...entry, name_lower: entry.name.toLowerCase()})

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

export const ademeToBlueforest = raws => map(raws, raw => ({
    updateOne: {
        filter: {externId: raw.externId},
        update: {
            $set: {
                externId: raw.externId,
                name: raw.nom,
                name_lower: raw.nom.toLowerCase(),
                ...ademeUnitToGrandeurEq(raw.unit),
                color: "#696969",
                origin: "ADEME",
                raw
            }
        },
        upsert: true
    }
}))

export const ademeUnitToGrandeurEq = ademeUnit => {
    const splitted = ademeUnit.split("éq.")
    if (splitted.length === 1) {
        return {grandeur: grandeur(ademeUnit)}
    } else if (splitted.length === 2) {
        return {grandeur: grandeur(splitted[0].trim()), eq: splitted[1].trim()}
    }
}

export const importAdemeEntries = async buffer => {
    const result = await impactsEntry().bulkWrite(ademeToBlueforest(await parse(buffer, parseDesc)), {ordered: false})
    return {
        ok: result.ok === 1,
        insertions: result.nInserted,
        upsertions: result.nUpserted,
        matches: result.nMatched,
        modifieds: result.nModified,
        removeds: result.nRemoved
    }
}