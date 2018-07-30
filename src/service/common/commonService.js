import {withIdIn} from "trees-query"
import _ from 'lodash'
import {col} from "trees-db-version/dist"

export const appendItemsInfos = (colname, fields) => async item => {
    const items = item.items
    const infos = await col(colname).find(withIdIn(_.map(items, "_id")), fields).toArray()

    for (let i = 0; i < items.length; i++) {
        let trunk = items[i]
        for (let j = 0; j < infos.length; j++) {
            let info = infos[j]
            if (trunk._id.equals(info._id)) {
                Object.assign(trunk, info)
            }
        }
    }
    return item
}