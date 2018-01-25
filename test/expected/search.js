import {initialDB} from "../data/initialDB";
import {cols} from "../../src/const/collections";
import _ from 'lodash';

const searchResult = _.pick(initialDB[cols.TREES][1],['_id','name']);

export const search = {
    term: "Dou",
    expected: [searchResult]
};