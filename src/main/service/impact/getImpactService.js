import {cols} from "../../const/collections";
import {col} from "../../db";
import {emptyGroup, withId} from "trees-query";
import _ from 'lodash';

const impacts = () => col(cols.IMPACT);

export const getImpact = _id =>
    impacts()
        .findOne(withId(_id))
        .then(impact => _.isNil(impact) ? emptyGroup(_id) : impact);