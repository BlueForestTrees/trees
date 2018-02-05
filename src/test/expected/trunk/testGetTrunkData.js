import {initialTrees, farine, gateau} from "../../scenario/integ/testIntegDatabase";
import _ from 'lodash';
import {removeObjects} from "../../../main/util/addObjectID";

export const getAll = {
    res: {
        body: removeObjects(initialTrees)
    }
};

const searchResult = [_.pick(farine, ['_id', 'name'])];

export const search = {
    req: {
        term: farine.name.substring(0, 3),
    },
    res: {
        body: searchResult
    }
};

export const getTrunk = {};
getTrunk.req = {
    _id: gateau._id
};
getTrunk.res = {
    body: _.omit(gateau, 'name_lower')
};