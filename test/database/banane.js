import {cols} from "../../src/const/collections"
import {withDbTrunk} from "test-api-express-mongo"
import {object} from "test-api-express-mongo"

export const bananeBC = withDbTrunk("Banane BC", "6b6a03c03e77667641d2d2c3", 1, "Nomb")
export const banane = withDbTrunk("banane canaries", "7b6a03c03e77667641d2d2c3", 1, "Nomb")
export const transport = withDbTrunk("transport", "8b6a03c03e77667641d2d2c3", 1000000, "Long")

export const bananeBCRoots = [
    {_id: object("bbbbbbb03e77667641d2d2c2"), trunkId: bananeBC._id, rootId: banane._id, bqt: 1},
    {_id: object("bbbbbbb03e77667641d2d2c3"), trunkId: bananeBC._id, rootId: transport._id, bqt: 1, relativeTo: {_id: banane._id, bqt: 500}}
]

export const database = {
    [cols.TRUNK]: [bananeBC, banane, transport],
    [cols.ROOT]: [...bananeBCRoots]
}