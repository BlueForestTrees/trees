import _ from 'lodash';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import read from 'fs-readdir-recursive';
import path from 'path';

import {cols} from "../main/const/collections";
import {col, dbConnect} from "../main/db";
import {addObjects, removeObjects} from "../main/util/addObjectID";
import {withId} from "../main/util/query";
import {clon} from "./util/testUtil";


chai.use(chaiHttp);
chai.should();

export const initDatabase = async () => {
    return await dbConnect()
        .then(purgeDatabase)
        .then(addInitialData);
};

const buildDatabase = dbPartPath => {
    const db = _.fromPairs(_.map(cols, colName => [colName, []]));
    read(dbPartPath)
        .forEach(function (file) {
            if (file.indexOf(".js") > 1) {
                const dbPart = require(path.join(dbPartPath, file)).database;

                _.forEach(cols, colName => {
                    if (_.has(dbPart, colName)) {
                        db[colName].push(...dbPart[colName]);
                    }
                });
            }
        });

    return {
        db,
        objectDB: _.fromPairs(_.map(db, (value, key) => ([key, addObjects(clon(value))])))
    };
};

export const run2 = (job, spec) => done => {
    before(spec)
        .then(spec => job(spec))
        .then(() => done())
        .catch(err => done(err));
};

const before = async spec => {
    if (spec.db && spec.db.preChange) {
        await updateDb(spec.db.preChange);
    }
    return spec;
};
const updateDb = async ({colname, doc}) => {
    await col(colname).deleteOne(withId(doc._id));
    await col(colname).insertOne(addObjects(doc));
};

const databaseDef = buildDatabase(path.join(__dirname, "database"));
const database = databaseDef.db;
export const initialDB = databaseDef.objectDB;

export const purgeDatabase = async () => Promise.all(_.map(cols, colname => col(colname).deleteMany()));

export const addInitialData = async () => {
    return Promise.all(_.map(cols, async (colname) => {
        let datas = initialDB[colname];
        if (datas && datas.length > 0) {
            return await col(colname).insert(datas);
        }
    }));
};

export const assertDb = async ({list, colname, doc, missingDoc}) => {
    if (list) {
        return Promise.all(_.map(list, expected => assertDb(expected)));
    } else if (doc) {
        const dbDoc = await loadFromDbById(colname, doc._id);
        return expect(dbDoc).to.deep.equal(doc);
    } else if (missingDoc) {
        const dbDoc = await loadFromDbById(colname, missingDoc._id);
        return expect(dbDoc).to.be.null;
    }
};

export const loadFromDbById = async (colname, _id) => removeObjects(await col(colname).findOne(withId(_id)));

export const initialTrees = database[cols.TRUNK];
const initialFacetEntries = database[cols.FACET_ENTRY];
const initialImpactEntries = database[cols.IMPACT_ENTRY];

export const withNames = items => _.forEach(items, root => root.name = nameOf(root._id));
export const nameOf = (_id) => _.find(initialTrees, {_id}).name;
export const nameOfFacet = (_id) => _.find(initialFacetEntries, {_id}).name;
export const nameOfImpact = (_id) => _.find(initialImpactEntries, {_id}).name;