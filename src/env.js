import {debug} from "./main/util/debug";

const ENV = {
    port: process.env.PORT || 8080,
    dbname: process.env.DBNAME || "BlueForestTreesDB",
    dbhost: process.env.DBHOST || "localhost",
    dbport: process.env.DBPORT || 27017,
    node_env: process.env.NODE_ENV || null
};

debug({ENV});

export default ENV;