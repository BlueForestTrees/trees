import {cols} from "../../src/const/collections"
import {withDbTrunk} from "test-api-express-mongo/dist/domain"


export const biere = withDbTrunk("Bière Heineken", "6a6a03c03e77667641d2d2c3",6,"Nomb")
export const capsule = withDbTrunk("capsule", "7a6a03c03e77667641d2d2c3",12,"Nomb")

export const database = {
    [cols.TRUNK]: [biere, capsule]
}