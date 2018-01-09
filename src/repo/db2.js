const mongo = require('mongodb');

let database = null;

function init() {
    mongo.MongoClient.connect('mongodb://localhost/TreeDB', function (err, _db) {
        if (err) {
            throw err;
        }
        database = _db;
    })
}

init();

module.exports = collectionName => database.collection(collectionName);