import {cols} from "../../src/const/collections"
import {withIdQuantity, withIdQuantityRelativeTo, withTrunk} from "test-api-express-mongo/dist/domain"


export const bananeBC = withTrunk("Banane BC", "6b6a03c03e77667641d2d2c3", 1, "count")
export const banane = withTrunk("banane canaries", "7b6a03c03e77667641d2d2c3", 1, "count")
export const transport = withTrunk("transport", "8b6a03c03e77667641d2d2c3", 1000, "km")

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