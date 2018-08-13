import {clon} from "test-api-express-mongo/dist/util"
import _ from 'lodash'
import {bleFacets, gateauRoots} from "../../database/gateau"

import {cols} from "../../../src/const/collections"
import {omit} from 'lodash';
import {withInfos} from "test-api-express-mongo/dist/db"
import {withoutQuantity} from "test-api-express-mongo/dist/domain"



const resultItems = _.forEach(clon(bleFacets.items), facet => {
    facet.quantity.qt *= 0.5
})