import {omit, pick} from 'lodash';
import {gateauTrunk} from "../../database/gateau";
import {eauTrunk, elecTrunk, skateTrunk} from "../../database/skate";
import {e1Trunk, e2Trunk} from "../../database/lettres";
import {notInSearchMixin} from "../testCommonSpec";

export const searchTrunkSpec = {
    req: {
        url:`/api/trunks?q=${skateTrunk.name.substring(0, 3)}`,
    },
    res: {
        body: [omit(skateTrunk, notInSearchMixin)]
    }
};

export const searchTrunkSpec2 = {
    req: {
        url:`/api/trunks?q=${eauTrunk.name.substring(0, 1)}`,
    },
    res: {
        body: [
            omit(e1Trunk, notInSearchMixin),
            omit(e2Trunk, notInSearchMixin),
            omit(eauTrunk, notInSearchMixin),
            omit(elecTrunk, notInSearchMixin)
        ]
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