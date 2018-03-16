import ENV from "../env";
import mongodb from 'mongodb';

const client = mongodb.MongoClient;
const connectionString = `mongodb://${ENV.dbhost}:${ENV.dbport}/${ENV.dbname}`;

let database = null;

export const dbConnect = () => {
    console.log("Connecting mongo with '" + connectionString + "'...");
    return client.connect(connectionString)
        .then(db => database = db);
};

export const col = collectionName => database.collection(collectionName);