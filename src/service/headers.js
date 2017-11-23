const db = require('../repo/db');
const fields = {qt:1,displayUnit:1,name:1};
const headers = {};

headers.all = async () => {
    return (await db).collection('Trees').find({}, fields).toArray();
};

module.exports = headers;