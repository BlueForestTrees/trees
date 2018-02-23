
import _ from 'lodash';
import {vitCImpactEntry} from "../../database/impactEntries";

export const postImpactEntrySpec = {};
postImpactEntrySpec.req = {
    body: {
        name: "nomNewImpactEntry",
        grandeur: "Densité"
    }
};
postImpactEntrySpec.res = {
    body: _id => ({
        _id,
        name: "nomNewImpactEntry",
        grandeur: "Densité"
    })
};

export const postBadGrandeurImpactEntrySpec = {};
postBadGrandeurImpactEntrySpec.req = {
    body: {
        name: "nomNewImpactEntry",
        grandeur: "Dens   ité"
    }
};
postBadGrandeurImpactEntrySpec.res = {
    status: 422,
    bodyMessage: "Invalid value"
};


export const allreadyExistingImpactEntrySpec = {};
allreadyExistingImpactEntrySpec.req = {
    body: {
        ..._.omit(vitCImpactEntry, "_id")
    }
};
allreadyExistingImpactEntrySpec.res = {
    body: _id => vitCImpactEntry
};