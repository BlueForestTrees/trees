import {oneModifiedResponse} from "../testCommonData";
import {trunkQtRootsQt} from "../../scenario/integ/testIntegDatabase";
import _ from 'lodash';
import {cols} from "../../../main/const/collections";

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