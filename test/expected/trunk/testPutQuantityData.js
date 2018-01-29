import {oneModifiedResponse} from "../testCommonData";
import {cols} from "../../../src/const/collections";
import {trunkQtRootsQt} from "../../scenario/integ/testIntegDatabase";
import _ from 'lodash';

const quantity = {qt: 69, unit: "m"};

export const quantify = {};

quantify.req = {
    params: {_id: trunkQtRootsQt._id},
    body: {
        quantity
    }
};
quantify.res = {
    body: oneModifiedResponse
};

quantify.db = {
    expected: {
        colname: cols.TRUNK,
        doc: {
            ...(_.omit(trunkQtRootsQt, 'quantity')),
            quantity
        }
    }
};