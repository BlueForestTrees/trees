import {anoAnotherFacetEntry, anotherFacetEntry, laFacet, rightTrunk} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {cols} from "../../../src/const/collections";
import _ from 'lodash';

export const firstFacet = {};
const firstTrunkId = rightTrunk._id;

let firstPostedFacet = {
    _id: anoAnotherFacetEntry._id,
    qt: 144,
    unit: "m2"
};

firstFacet.req = {
    _id: firstTrunkId,
    body: {facet: firstPostedFacet}
};

firstFacet.res = {
    body: oneUpsertedResponse("5a6a03c03e77667641d2d2c1")
};

firstFacet.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            _id: firstTrunkId,
            facets: [
                firstPostedFacet
            ],

        }
    }
};

export const thirdFacet = {};
const trunkId = laFacet._id;

let thridPostedFacet = {
    _id: anoAnotherFacetEntry._id,
    qt: 144,
    unit: "m2"
};

thirdFacet.req = {
    _id: trunkId,
    body: {facet: thridPostedFacet}
};

thirdFacet.res = {
    body: oneModifiedResponse
};

thirdFacet.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            _id: trunkId,
            facets: [
                ...laFacet.facets,
                thridPostedFacet
            ],

        }
    }
};


export const updatingFacet = {};
const updatingTrunkId = laFacet._id;

let updatePostedFacet = {
    _id: anotherFacetEntry._id,
    qt: 14,
    unit: "m"
};

updatingFacet.req = {
    _id: updatingTrunkId,
    body: {facet: updatePostedFacet}
};

updatingFacet.res = {
    body: oneModifiedResponse
};

updatingFacet.db = {
    expected: {
        colname: cols.FACET,
        doc: {
            _id: updatingTrunkId,
            facets: [
                ...(_.without(laFacet.facets, {_id: updatePostedFacet._id})),
                updatePostedFacet
            ],

        }
    }
};