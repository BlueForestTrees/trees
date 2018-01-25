import {cols} from "../../src/const/collections";
import _ from 'lodash';
import {col} from "../../src/repo/db";

import {objId} from "../../src/util/sanitize";
import {initialDB} from "../initial/testDB";

export const objectID = /^[a-fA-F0-9]{24}$/;

export const purgeDatabase = () => {
    _.forEach(cols, (colname) => {
        col(colname).deleteMany();
    });
};

export const initDatabase = () => {
    purgeDatabase();
    addInitialTestData();
};

export const addInitialTestData = () => {
    _.forEach(cols, async (colname) => {

        let datas = objId(initialDB[colname]);

        if(datas.length > 0) {
            await col(colname).insert(datas);
        }

    });
};

