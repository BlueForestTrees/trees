import {clon} from "../../util/testUtil";
import _ from 'lodash';
import {bleImpacts, farine} from "../../database/gateau";
import {nameOfImpact} from "../../testIntegDatabase";

export const getImpactSpec = {};

const laImpactWithItsImpactEntryFields = _.forEach(clon(bleImpacts.items), impact => impact.name = nameOfImpact(impact._id));

getImpactSpec.req = {
    _id: bleImpacts._id
};

getImpactSpec.res = {
    body: {
        _id: getImpactSpec.req._id,
        items: laImpactWithItsImpactEntryFields
    }
};


export const emptyGetImpactSpec = {};

emptyGetImpactSpec.req = {
    _id: farine._id
};

emptyGetImpactSpec.res = {
    body: {
        _id: emptyGetImpactSpec.req._id,
        items: []
    }
};