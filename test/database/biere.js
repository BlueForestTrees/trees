import {cols} from "../../src/const/collections"
import {withTrunk} from "test-api-express-mongo/dist/domain"


export const biere = withTrunk("Bière Heineken", 6,"count")
export const capsule = withTrunk("capsule", 12,"count")

export const database = {
    [cols.TRUNK]: [biere, capsule]
}