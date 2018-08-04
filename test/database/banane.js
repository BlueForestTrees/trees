import {cols} from "../../src/const/collections"
import {withIdQuantity, withIdQuantityRelativeTo, withTrunk} from "test-api-express-mongo/dist/domain"


export const bananeBC = withTrunk("Banane BC", 1, "count")
export const banane = withTrunk("banane canaries", 1, "count")
export const transport = withTrunk("transport", 1000, "km")

export const bananeBCRoot = {
    ...withIdQuantity(bananeBC._id, 1, "count"),
    items:[
        withIdQuantity(banane._id, "1", "count"),
        withIdQuantityRelativeTo(transport._id, "5000", "km", banane._id),
    ]
}

export const database = {
    [cols.TRUNK]: [bananeBC, banane, transport],
    [cols.ROOT]: [bananeBCRoot]
}