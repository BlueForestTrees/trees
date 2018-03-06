import _ from 'lodash';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {cols} from "../../../main/const/collections";
import {col} from "../../../main/db";
import {removeObjects} from "../../../main/util/addObjectID";
import {withId} from "../../../main/util/query";

chai.use(chaiHttp);
chai.should();

export const initDatabase = async () => {
    await purgeDatabase();
    return await addInitialData();
};

export const purgeDatabase = async () => Promise.all(_.map(cols, colname => col(colname).deleteMany()));

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

export const run = job => done => {
    job()
        .then(() => done())
        .catch(err => done(err));
};