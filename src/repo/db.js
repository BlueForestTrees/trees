const mongo = require('mongodb');

async function connect(){
    return await mongo.MongoClient.connect('mongodb://localhost/TreeDB')
}

module.exports = connect();