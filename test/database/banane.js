import {cols} from "../../src/collections"
import {withDbTrunk} from "test-api-express-mongo"
import {object} from "test-api-express-mongo"
import {god} from "./users"

export const bananeBC = withDbTrunk("Banane BC", "6b6a03c03e77667641d2d2c3", 1, "Mass")
bananeBC.oid = god._id
export const banane = withDbTrunk("banane canaries", "7b6a03c03e77667641d2d2c3", 1, "Mass")
export const camionTrunk = withDbTrunk("Camion", "8b6a03c03e77667641d2d2c3", 1000000, "Tran")

export const bananeBCRoots = [
    {_id: object("bbbbbbb03e77667641d2d2c2"),oid: god._id, trunkId: bananeBC._id, rootId: banane._id, bqt: 1},
    {_id: object("bbbbbbb03e77667641d2d2c3"),oid: god._id, trunkId: bananeBC._id, rootId: camionTrunk._id, bqt: 1, relativeTo: {_id: banane._id, bqt: 500}}
]

export const database = {
    [cols.TRUNK]: [bananeBC, banane, camionTrunk],
    [cols.ROOT]: [...bananeBCRoots]
}