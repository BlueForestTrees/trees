import _ from 'lodash';
import {cols} from "../../src/const/collections";
import {col} from "../../src/repo/index";
import {removeObjects} from "../../src/util/addObjectID";
import {objectInitialDB} from "../data/database";
import {expect} from 'chai';
import {withId} from "../../src/util/query";

export const purgeDatabase = async () => {
    await _.forEach(cols, async (colname) => {
        await col(colname).deleteMany();
    });
};

export const initDatabase = async () => {
    await purgeDatabase();
    return await addInitialData();
};

export const addInitialData = async () => {
    return Promise.all(_.map(cols, async (colname) => {
        let datas = objectInitialDB[colname];
        if (datas && datas.length > 0) {
            return await col(colname).insert(datas);
        }
    }));
};

export const assertDb = async ({colname, doc, missingDoc}) => {
    if (doc) {
        const dbDoc = await loadFromDbById(colname, doc._id);
        return expect(dbDoc).to.deep.equal(doc);
    }else if (missingDoc){
        const dbDoc = await loadFromDbById(colname, missingDoc._id);
        return expect(dbDoc).to.be.null;
    }
};

export const loadFromDbById = async (colname, _id) => removeObjects(await col(colname).findOne(withId(_id)));

//export const keysOf = (array, keys) => _.map(array, obj => _.pick(obj, keys));

export const noRessources = tree => {
    delete tree.ressources;
    return tree;
};