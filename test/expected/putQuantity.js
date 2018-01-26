import {oneModifiedResponse} from "./common";
import {cols} from "../../src/const/collections";
import {withQtParentTree} from "../data/database";
import _ from 'lodash';

const quantity = {qt: 69, unit: "m"};

export const quantify = {};

quantify.req = {
    params: {_id: withQtParentTree._id},
    body: {
        quantity
    }
};
quantify.res = {
    body: oneModifiedResponse
};

quantify.db = {
    expected: {
        colname: cols.TREES,
        doc: {
            ...(_.omit(withQtParentTree, 'quantity')),
            quantity
        }
    }
};