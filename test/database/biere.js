import {cols} from "../../src/const/collections"
import {withTrunk} from "test-api-express-mongo/dist/domain"


export const biere = withTrunk("Bière Heineken", "6a6a03c03e77667641d2d2c3",6,"count")
export const capsule = withTrunk("capsule", "7a6a03c03e77667641d2d2c3",12,"count")

export const database = {
    [cols.TRUNK]: [biere, capsule]
}