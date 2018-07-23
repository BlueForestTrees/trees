import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import {emptyGroup, withId} from "trees-query";
import {isNil} from 'lodash';

const impacts = () => col(cols.IMPACT);

export const getImpact = _id =>
    impacts()
        .findOne(withId(_id))
        .then(impact => isNil(impact) ? emptyGroup(_id) : impact);