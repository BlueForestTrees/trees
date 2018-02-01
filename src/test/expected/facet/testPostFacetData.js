import {anoAnotherFacetEntry, anotherFacetEntry, laFacet, rightTrunk} from "../../scenario/integ/testIntegDatabase";
import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {replace} from "../../testUtil";
import {cols} from "../../../main/const/collections";

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
            items: [
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
            items: [
                ...laFacet.items,
                thridPostedFacet
            ],

        }
    }
};


export const updatingFacet = {};
const updatingTrunkId = laFacet._id;

let anotherFacetUpdate = {
    _id: anotherFacetEntry._id,
    qt: 14,
    unit: "m"
};

updatingFacet.req = {
    _id: updatingTrunkId,
    body: {facet: anotherFacetUpdate}
};

updatingFacet.res = {
    body: oneModifiedResponse
};

updatingFacet.db = {
    expected: {
        colname: cols.FACET,
        doc: replace(laFacet, "items", anotherFacetUpdate)
    }
};