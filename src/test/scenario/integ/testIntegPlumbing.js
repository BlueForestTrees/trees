import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {col} from "../../../main/db";
import {removeObjects} from "../../../main/util/addObjectID";
import {withId} from "trees-query";

chai.use(chaiHttp);
chai.should();

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