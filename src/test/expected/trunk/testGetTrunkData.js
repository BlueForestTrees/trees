import _ from 'lodash';
import {removeObjects} from "../../../main/util/addObjectID";
import {initialTrees} from "../../testIntegDatabase";
import {farine, gateau} from "../../database/gateau";

export const getAllTrunkSpec = {
    res: {
        body: removeObjects(initialTrees)
    }
};

const searchResult = [_.pick(farine, ['_id', 'name'])];
export const searchTrunkSpec = {
    req: {
        term: farine.name.substring(0, 3),
    },
    res: {
        body: searchResult
    }
};

export const getTrunkSpec = {};
getTrunkSpec.req = {
    _id: gateau._id
};
getTrunkSpec.res = {
    body: _.omit(gateau, 'name_lower')
};