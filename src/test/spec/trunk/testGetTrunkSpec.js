import _ from 'lodash';
import {removeObjects} from "../../../main/util/addObjectID";
import {initialTrees} from "../../util/testIntegDatabase";
import {farineTrunk, gateauTrunk} from "../../database/gateau";

export const getAllTrunkSpec = {
    res: {
        body: removeObjects(initialTrees)
    }
};

const searchResult = [_.pick(farineTrunk, ['_id', 'name'])];
export const searchTrunkSpec = {
    req: {
        term: farineTrunk.name.substring(0, 3),
    },
    res: {
        body: searchResult
    }
};

export const getTrunkSpec = {};
getTrunkSpec.req = {
    _id: gateauTrunk._id
};
getTrunkSpec.res = {
    body: _.omit(gateauTrunk, 'name_lower')
};