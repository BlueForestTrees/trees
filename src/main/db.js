import {dbname} from "./const/collections";

const mongo = require('mongodb').MongoClient;

let database = null;

export const dbConnect = () =>
    mongo
        .connect(`mongodb://localhost/${dbname}`)
        .then(db => {
            database = db;
            console.log(`Connected to mongodb://localhost/${dbname}`)
        })
        .catch(e => {
            throw e;
        });


export const col = collectionName => database.collection(collectionName);