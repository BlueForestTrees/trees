import _ from 'lodash';
import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import {cols} from "../../../src/const/collections";
import {col} from "../../../src/repo";
import {removeObjects} from "../../../src/util/addObjectID";
import {initialDB} from "./testIntegDatabase";
import {withId} from "../../../src/util/query";

chai.use(chaiHttp);
chai.should();

export const initDatabase = async () => {
    await purgeDatabase();
    return await addInitialData();
};

export const purgeDatabase = async () => {
    return Promise.all(_.map(cols, async (colname) => {
        return await col(colname).deleteMany();
    }));
};

export const addInitialData = async () => {
    return Promise.all(_.map(cols, async (colname) => {
        let datas = initialDB[colname];
        if (datas && datas.length > 0) {
            return await col(colname).insert(datas);
        }
    }));
};

export const assertDb = async ({colname, doc, missingDoc}) => {
    if (doc) {
        const dbDoc = await loadFromDbById(colname, doc._id);
        return expect(dbDoc).to.deep.equal(doc);
    } else if (missingDoc) {
        const dbDoc = await loadFromDbById(colname, missingDoc._id);
        return expect(dbDoc).to.be.null;
    }
};

export const loadFromDbById = async (colname, _id) => removeObjects(await col(colname).findOne(withId(_id)));