import {MongoClient} from 'mongodb';

async function connect(){
    try {
        return await MongoClient.connect('mongodb://localhost/TreeDB')
    }catch(e){
        console.error(e);
    }
}

export default connect();