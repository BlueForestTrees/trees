import _ from 'lodash';
import read from 'fs-readdir-recursive';
import path from 'path';
import {withId} from "trees-query";
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {cols} from "../../main/const/collections";
import {col, dbConnect} from "../../main/db";
import {addObjects, removeObjects} from "../../main/util/addObjectID";
import {clon, debug} from "./testUtil";

chai.use(chaiHttp);
chai.should();

export const initDatabase = () =>
    dbConnect()
        .then(purgeDatabase)
        .then(addInitialData);

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

export const updateDb = async ({colname, doc}) => {
    await col(colname).deleteOne(withId(doc._id));
    await col(colname).insertOne(addObjects(doc));
};

const databaseDef = buildDatabase(path.join(__dirname, "../database"));
const database = databaseDef.db;
export const initialDB = databaseDef.objectDB;

export const purgeDatabase = async () => Promise.all(_.map(cols, colname => {
    console.log("Suppression : " + colname);
    return col(colname).deleteMany();
}));

export const addInitialData = async () => {
    return Promise.all(_.map(cols, async (colname) => {
        let datas = initialDB[colname];
        if (datas && datas.length > 0) {
            console.log(`Insertion : ${colname} (${datas.length} documents)`);
            return await col(colname).insert(datas);
        }
    }));
};

export const assertDb = async ({list, colname, doc, missingDoc}) => {
    if (list) {
        return Promise.all(_.map(list, expected => assertDb(expected)));
    } else if (doc) {
        const dbDoc = await loadFromDbById(colname, doc._id);
        try {
            expect(dbDoc).to.deep.equal(doc);
        } catch (e) {
            console.log("assertDB KO");
            throw e;
        }
        debug("dbDoc", dbDoc);
    } else if (missingDoc) {
        const dbDoc = await loadFromDbById(colname, missingDoc._id);
        expect(dbDoc).to.be.null;
        debug("removed", dbDoc);
    }
};

export const loadFromDbById = async (colname, _id) => removeObjects(await col(colname).findOne(withId(_id)));


export const withTrunkInfos = items => _.map(items, item => Object.assign(item, trunkInfos(item._id)));
export const trunkInfos = (_id) => _.pick(_.find(database[cols.TRUNK], {_id}), ["name", "color"]);
export const facetInfos = (_id) => _.pick(_.find(database[cols.FACET_ENTRY], {_id}), ["name", "color"]);
export const impactInfos = (_id) => _.pick(_.find(database[cols.IMPACT_ENTRY], {_id}), ["name", "color"]);
