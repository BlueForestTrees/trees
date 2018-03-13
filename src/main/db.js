import {dbname} from "./../env";

const mongo = require('mongodb');

let database = null;

export const dbConnect = () => {
    console.log("Connecting mongo on " + dbname + "...");
    return mongo.MongoClient.connect(`mongodb://localhost/${dbname}`)
        .then(db => {
            database = db;
            console.log(`connected to mongodb://localhost/${dbname}`)
        })
        .catch(e => {
            throw e;
        });
};

export const col = collectionName => database.collection(collectionName);