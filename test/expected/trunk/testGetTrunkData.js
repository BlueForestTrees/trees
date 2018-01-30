import {initialTrees, laRoot, rightTrunk, trunkQtRootsQt} from "../../scenario/integ/testIntegDatabase";
import {removeObjects} from "../../../src/util/addObjectID";
import _ from 'lodash';

export const getAll = {
    res: {
        body: removeObjects(initialTrees)
    }
};

const searchResult = _.pick(rightTrunk, ['_id', 'name']);

export const search = {
    req: {
        term: rightTrunk.name.substring(0, 3),
    },
    res: {
        body: [searchResult]
    }
};

export const getTrunk = {};
getTrunk.req = {
    _id: trunkQtRootsQt._id
};
getTrunk.res = {
    body: {
        ..._.omit(trunkQtRootsQt,'name_lower')
    }
};