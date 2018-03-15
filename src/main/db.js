import {dbname} from "./../env";
import {dbhost} from "../env";

const mongo = require('mongodb');

let database = null;

export const dbConnect = () => {
    console.log("Connecting mongo on " + dbname + "...");
    return mongo.MongoClient.connect(`mongodb://${dbhost}/${dbname}`)
        .then(db => {
            database = db;
            console.log(`connected to "mongodb://${dbhost}/${dbname}"`)
        })
        .catch(e => {
            throw e;
        });
};

export const col = collectionName => database.collection(collectionName);