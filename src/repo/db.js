const mongo = require('mongodb');

async function connect(){
    try {
        return await mongo.MongoClient.connect('mongodb://localhost/TreeDB')
    }catch(e){
        console.error(e);
    }
}

module.exports = connect();