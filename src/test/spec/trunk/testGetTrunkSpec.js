import {omit, pick} from 'lodash';
import {gateauTrunk} from "../../database/gateau";
import {eauTrunk, elecTrunk, skateTrunk} from "../../database/skate";
import {baaTrunk, e1Trunk, e2Trunk} from "../../database/lettres";
import {notInSearchMixin} from "../testCommonSpec";
import {bateauTrunk, voitureTrunk} from "../../database/transports";

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

export const typedSearchTrunkSpec = {
    req: {
        url:`/api/trunks?t=TR`,
    },
    res: {
        body: [
            omit(bateauTrunk, notInSearchMixin),
            omit(voitureTrunk, notInSearchMixin),
        ]
    }
};

export const typedSearchTrunkSpec2 = {
    req: {
        url:`/api/trunks?q=voi&t=TR`,
    },
    res: {
        body: [
            omit(voitureTrunk, notInSearchMixin),
        ]
    }
};

export const getTrunkGateauSpec = {
    req: {
        url: `/api/trunk/${gateauTrunk._id}`
    },
    res: {
        body: omit(gateauTrunk, 'name_lower')
    }
};

export const getTrunkBaaSpec = {
    req: {
        url: `/api/trunk/0.1/kg/${baaTrunk._id}`
    },
    res: {
        body: {...omit(baaTrunk, ['name_lower', 'quantity']), quantity: {qt: 0.1, unit: "kg"}}
    }
};

export const getQtTrunkGateauSpec = {
    req: {
        url: `/api/trunk/5/kg/${gateauTrunk._id}`
    },
    res: {
        body: {...omit(gateauTrunk, ['name_lower', 'quantity']), quantity: {qt: 5, unit: "kg"}}
    }
};

export const getQtTrunkBateauSpec = {
    req: {
        url: `/api/trunk/7/t*km/${bateauTrunk._id}`
    },
    res: {
        body: {...omit(bateauTrunk, ['name_lower', 'quantity']), quantity: {qt: 7, unit: "t*km"}}
    }
};