import {clon} from "../../util/testUtil";
import _ from 'lodash';
import {bleImpacts, farine} from "../../database/gateau";
import {nameOfImpact} from "../../testIntegDatabase";
import {withQuantity} from "../../testPlumbing";

export const getImpactSpec = {};

const laImpactWithItsImpactEntryFields = _.forEach(clon(bleImpacts.items), impact => {
    impact.name = nameOfImpact(impact._id);
    delete impact.quantity;
});

getImpactSpec.req = {
    _id: bleImpacts._id
};

getImpactSpec.res = {
    body: {
        _id: getImpactSpec.req._id,
        items: laImpactWithItsImpactEntryFields
    }
};

export const getQuantifiedImpactSpec = {};

const resultItems = _.forEach(clon(bleImpacts.items), bleImpact => {
    bleImpact.name = nameOfImpact(bleImpact._id);
    bleImpact.quantity.qt *= 0.5;
});

getQuantifiedImpactSpec.req = {
    _id: bleImpacts._id,
    qt: 5000,
    unit: "g"
};

getQuantifiedImpactSpec.res = {
    body: {
        _id: getImpactSpec.req._id,
        ...withQuantity(5000,"g"),
        items: resultItems
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


export const emptyQuantifiedGetImpactSpec = {};

emptyQuantifiedGetImpactSpec.req = {
    _id: "5a6a03c03e77667641d21234",
    qt: 15,
    unit: "g"
};

emptyQuantifiedGetImpactSpec.res = {
    body: {
        _id: emptyQuantifiedGetImpactSpec.req._id,
        ...withQuantity(15,"g"),
        items: []
    }
};