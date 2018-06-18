import {omit, pick} from 'lodash';
import {gateauTrunk} from "../../database/gateau";
import {eauTrunk, skateTrunk} from "../../database/skate";
import {e1Trunk} from "../../database/lettres";
import {notInSearchMixin} from "../testCommonSpec";

export const searchTrunkSpec = {
    req: {
        term: skateTrunk.name.substring(0, 3),
    },
    res: {
        body: [omit(skateTrunk, notInSearchMixin)]
    }
};

export const searchTrunkSpec2 = {
    req: {
        term: eauTrunk.name.substring(0, 2),
    },
    res: {
        body: [omit(e1Trunk, notInSearchMixin), omit(eauTrunk, notInSearchMixin)]
    }
};

export const getTrunkSpec = {};
getTrunkSpec.req = {
    _id: gateauTrunk._id
};
getTrunkSpec.res = {
    body: omit(gateauTrunk, 'name_lower')
};

export const getQtTrunkSpec = {};
getQtTrunkSpec.req = {
    _id: gateauTrunk._id,
    qt: 5,
    unit: "kg"
};
getQtTrunkSpec.res = {
    body: {...omit(gateauTrunk, ['name_lower', 'quantity']), quantity: {qt: 5, unit: "kg"}}
};