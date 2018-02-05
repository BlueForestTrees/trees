import {oneModifiedResponse} from "../testCommonData";
import {gateau} from "../../scenario/integ/testIntegDatabase";
import _ from 'lodash';
import {cols} from "../../../main/const/collections";

const quantity = {qt: 69, unit: "m"};

export const quantify = {};

quantify.req = {
    params: {_id: gateau._id},
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
            ...(_.omit(gateau, 'quantity')),
            quantity
        }
    }
};