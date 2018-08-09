import {cols} from "../../src/const/collections"
import {withIdBqt, withIdBqtGRelativeTo, withDbTrunk} from "test-api-express-mongo/dist/domain"


export const bananeBC = withDbTrunk("Banane BC", "6b6a03c03e77667641d2d2c3", 1, "Nomb")
export const banane = withDbTrunk("banane canaries", "7b6a03c03e77667641d2d2c3", 1, "Nomb")
export const transport = withDbTrunk("transport", "8b6a03c03e77667641d2d2c3", 1000000, "Long")

export const bananeBCRoot = {
    ...withIdBqt(bananeBC._id, 1),
    items:[
        withIdBqt(banane._id, 1),
        withIdBqtGRelativeTo(transport._id, "5000000", "Long", banane._id),
    ]
}

export const database = {
    [cols.TRUNK]: [bananeBC, banane, transport],
    [cols.ROOT]: [bananeBCRoot]
}