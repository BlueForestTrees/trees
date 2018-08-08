import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import {parse} from "../../util/csv"
import {map} from "lodash"
import {resolveTrunkExternId} from "../trunk/getTrunkService"
import {lookupImpactEntryByExternId} from "../impactEntry/getImpactEntryService"

const collection = () => col(cols.IMPACT)

export const ademeToBlueforestImpact = raws => Promise.all(map(raws, async raw => {
        let trunk = {externId: raw.externId}
        try {
            trunk = await resolveTrunkExternId(raw.externId)
        } catch (e) {//valeur par défaut de trunk
        }
        return {
            insertOne: {
                ...trunk,
                items: map(raw.items, async item => {
                    let impactEntry = {externId: item.externId}
                    try {
                        impactEntry = await lookupImpactEntryByExternId(item.externId)
                    } catch (e) {//valeur par défaut de impactEntry
                    }
                    return {
                        ...impactEntry,
                        quantity: item.quantity
                    }
                })
            }
        }
    }
))

export const importAdemeImpact = async buffer => {
    let docs = await ademeToBlueforestImpact(await parse(buffer))
    console.log(docs)
    return collection().bulkWrite(docs, {ordered: false})
}