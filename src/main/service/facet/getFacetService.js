import {cols} from "../../const/collections";
import {col} from "../../repo";
import {emptyFacet, withId} from "../../util/query";
import _ from 'lodash';

const facets = () => col(cols.FACET);

export const getFacet = _id =>
    facets()
        .findOne(withId(_id))
        .then(facet => _.isNil(facet) ? emptyFacet(_id) : facet);