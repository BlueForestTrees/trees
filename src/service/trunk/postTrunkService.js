import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import {map, omit} from 'lodash'
import {getTrunk} from "./getTrunkService"
import {updateName} from './putTrunkService'
import {parse} from "../../util/excel"
import {getRandomColor} from "../../util/calculations"
import {grandeur} from "unit-manip"

const trunks = () => col(cols.TRUNK)

export const createOrClone = ({sourceId, name}) => sourceId ? clone(sourceId) : create({name})

export const putall = async (data) => {
    await trunks().remove()
    await trunks().insert(data)
    return trunks().find().toArray()
}

export const create = async (trunk,req) => {
    console.log("insertion de", trunk)
    return trunks().insertOne({...trunk, name_lower: trunk.name.toLowerCase()})
}

const clone = async sourceId => {
    const clone = await create(omit(await getTrunk(sourceId), '_id'))
    const renamed = {_id: clone._id, name: `${clone.name}${clone._id}`}

    await updateName(renamed)

    return renamed
}

const parseDesc = {
    firstDocAt: 3,
    fields: [
        {idx: 3, fieldName: "externId", xlsName: " UUID "},
        {idx: 4, fieldName: "Nom", xlsName: " Nom du flux "},
        {idx: 6, fieldName: "Version", xlsName: " Version "},
        {idx: 8, fieldName: "Synonymes", xlsName: " Synonymes "},
        {idx: 10, fieldName: "Catégorie 1", xlsName: " Catégorisation (niveau 1) "},
        {idx: 11, fieldName: "Catégorie 2", xlsName: " Catégorisation (niveau 2) "},
        {idx: 12, fieldName: "Catégorie 3", xlsName: " Catégorisation (niveau 3) "},
        {idx: 13, fieldName: "Catégorie 4", xlsName: " Catégorisation (niveau 4) "},
        {idx: 18, fieldName: "Commentaire Général", xlsName: " Commentaire Général "},
        {idx: 21, fieldName: "Flux de référence", xlsName: " Flux de référence ", under: "Quantité"},
        {idx: 22, fieldName: "Quantité de référence", xlsName: " Quantité de référence ", under: "Quantité"},
        {idx: 23, fieldName: "Unité", xlsName: " Unité ", under: "Quantité"},
        {idx: 25, fieldName: "Année de référence", xlsName: " Année de référence ", under: "Temps"},
        {idx: 26, fieldName: "Valable jusqu'au", xlsName: " Jeu de données valable jusqu'au ", under: "Temps"},
        {idx: 27, fieldName: "Description représentative du temps", xlsName: " Description représentative du temps ", under: "Temps"},
        {idx: 29, fieldName: "Localisation", xlsName: " Localisation "},
        {idx: 31, fieldName: "Description", xlsName: " Description de la technologie et des processus inclus ", under: "Technologie"},
        {idx: 32, fieldName: "Objectif", xlsName: " Objectif technique du produit ou du procédé ", under: "Technologie"},
        {idx: 33, fieldName: "Diagramme de flux", xlsName: " Diagramme de flux ", under: "Technologie"},

        {idx: 36, fieldName: "Type de dataset", xlsName: " Type de dataset ", under: "Modélisation et Validation", subunder: "Méthode et allocation LCI"},
        {idx: 37, fieldName: "Principe de la méthode LCI", xlsName: " Principe de la méthode LCI ", under: "Modélisation et Validation", subunder: "Méthode et allocation LCI"},
        {idx: 38, fieldName: "Déviations principe", xlsName: " Deviations from LCI method principle ", offsetX: true, under: "Modélisation et Validation", subunder: "Méthode et allocation LCI"},
        {idx: 39, fieldName: "Approches de la méthode LCI", xlsName: " Approches de la méthode LCI ", under: "Modélisation et Validation", subunder: "Méthode et allocation LCI"},
        {idx: 40, fieldName: "Déviations approches", xlsName: " Deviations from LCI method approaches ", offsetX: true, under: "Modélisation et Validation", subunder: "Méthode et allocation LCI"},

        // {fieldName: "Déviations approches", xlsName: " Deviations from LCI method approaches ", offsetX: true, under: "Modélisation et Validation", subunder: "Sources de données, traitement et représentativité"},

    ]
}

export const ademeToBlueforestTrunk = raws => map(raws, raw => {
    return {
        updateOne: {
            filter: {externId: raw.externId},
            update: {
                $set: {
                    externId: raw.externId,
                    name: raw.Nom,
                    name_lower: raw.Nom.toLowerCase(),
                    grandeur: grandeur(raw["Quantité"]["Unité"]) || erreurGrandeur(raw["Quantité"]["Unité"]),
                    quantity: {
                        qt: raw["Quantité"]["Quantité de référence"], unit: raw["Quantité"]["Unité"]
                    },
                    color: getRandomColor(),
                    origin: "ADEME",
                    raw
                }
            },
            upsert: true
        }
    }
})

export const importAdemeTrunkEntries = async buffer => {
    const result = await trunks().bulkWrite(ademeToBlueforestTrunk(await parse(buffer, parseDesc)), {ordered: false})
    return {
        ok: result.ok === 1,
        insertions: result.nInserted,
        upsertions: result.nUpserted,
        matches: result.nMatched,
        modifieds: result.nModified,
        removeds: result.nRemoved
    }
}

const erreurGrandeur = shortname => {
    const error = new Error(`grandeur non trouvée pour l'unité "${shortname}"`)
    error.status = 422
    throw error
}