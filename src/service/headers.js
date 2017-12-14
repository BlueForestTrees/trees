const db = require('../repo/db');
const mongo = require('mongodb');
const fields = {qt:1,unit:1,name:1};
const headers = {};


const withId = (value) => {
    return {"_id": new mongo.ObjectID(value)};
};

headers.get = async (id) => {
    return (await db).collection('Trees').findOne(withId(id), fields);
};

headers.all = async () => {
    return (await db).collection('Trees').find({}, fields).toArray();
};

module.exports = headers;