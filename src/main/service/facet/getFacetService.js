import {cols} from "../../const/collections";
import {col} from "../../db/db";
import {emptyGroup, withId} from "trees-query";
import _ from 'lodash';

const facets = () => col(cols.FACET);

export const getFacet = _id =>
    facets()
        .findOne(withId(_id))
        .then(facet => _.isNil(facet) ? emptyGroup(_id) : facet);