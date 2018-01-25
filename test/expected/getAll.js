import {initialDB} from "../data/initialDB";
import {cols} from "../../src/const/collections";
import _ from 'lodash';

export const getAll = {
    expected: _.map(initialDB[cols.TREES], obj => _.pick(obj, ["_id", "name"]))
};