import _ from 'lodash';
import {farineTrunk, gateauTrunk} from "../../database/gateau";
import {eauTrunk} from "../../database/skate";
import {e1Trunk} from "../../database/lettres";

const searchResult = [_.pick(farineTrunk, ['_id', 'name'])];
export const searchTrunkSpec = {
    req: {
        term: farineTrunk.name.substring(0, 3),
    },
    res: {
        body: searchResult
    }
};

const searchResult2 = [_.pick(eauTrunk, ['_id', 'name']),_.pick(e1Trunk, ['_id', 'name'])];
export const searchTrunkSpec2 = {
    req: {
        term: eauTrunk.name.substring(0, 2),
    },
    res: {
        body: searchResult2
    }
};

export const getTrunkSpec = {};
getTrunkSpec.req = {
    _id: gateauTrunk._id
};
getTrunkSpec.res = {
    body: _.omit(gateauTrunk, 'name_lower')
};