import {initialTrees, laRoot, rightTrunk, topTrunkQt} from "../data/database";
import {removeObjects} from "../../src/util/addObjectID";
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

export const trunk = {};
trunk.req = {
    _id: topTrunkQt._id
};
trunk.res = {
    body: {
        ..._.omit(topTrunkQt,'name_lower')
    }
};