import {parse} from "../../util/excel"
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import {parse} from "../../util/csv"

const impacts = col(cols.IMPACT)

const ademeToBlueforestImpact = e => e

export const importAdemeImpact = async buffer => {

    return await parse(buffer)

    // const result = await impacts().bulkWrite(ademeToBlueforestImpact(await parse(buffer, null)), {ordered: false})
    // return {
    //     ok: result.ok === 1,
    //     insertions: result.nInserted,
    //     upsertions: result.nUpserted,
    //     matches: result.nMatched,
    //     modifieds: result.nModified,
    //     removeds: result.nRemoved
    // }
}