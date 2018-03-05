import {dbname} from "./const/collections";

const mongo = require('mongodb');

let database = null;

export const connect = () => mongo.MongoClient.connect(`mongodb://localhost/${dbname}`)
    .then(db => {
        database = db;
    })
    .catch(e => {
        throw e;
    });

export const col = collectionName => database.collection(collectionName);