import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import {parse} from "../../util/csv"
import {map} from "lodash"
import {resolveTrunkExternId} from "../trunk/getTrunkService"
import {lookupImpactEntryByExternId} from "../impactEntry/getImpactEntryService"

const collection = () => col(cols.IMPACT)

const resolveTrunkOrDefault = async raw => {
    try {
        return await resolveTrunkExternId(raw.externId) || {externId: raw.externId}
    } catch (e) {
        return {externId: raw.externId}
    }
}
const resolveImpactOrDefault = async item => {
    try {
        return {
            ...await lookupImpactEntryByExternId(item.externId) || {externId: item.externId},
            bqt: item.bqt
        }
    } catch (e) {
        return item
    }
}

export const ademeToBlueforestImpact = raws => Promise.all(map(raws, async raw => ({
    insertOne: {
        ...await resolveTrunkOrDefault(raw),
        items: await Promise.all(map(raw.items, resolveImpactOrDefault))
    }
})))

export const importAdemeImpact = async buffer => collection().bulkWrite(await ademeToBlueforestImpact(await parse(buffer)), {ordered: false})