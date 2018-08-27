import {clon} from "test-api-express-mongo"
import _ from 'lodash'
import {bleFacets, gateauRoots} from "../../database/gateau"

import {cols} from "../../../src/const/collections"
import {omit} from 'lodash';
import {withInfos} from "test-api-express-mongo"
import {withoutQuantity} from "test-api-express-mongo"



const resultItems = _.forEach(clon(bleFacets.items), facet => {
    facet.quantity.qt *= 0.5
})