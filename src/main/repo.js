import {dbname} from "./const/collections";

const mongo = require('mongodb');

let database = null;

mongo.MongoClient.connect(`mongodb://localhost/${dbname}`, function (err, db) {
    if (err) {throw err;}
    database = db;
});

export const col = collectionName => database.collection(collectionName);