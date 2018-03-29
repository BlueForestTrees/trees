import {debug} from "./main/util/debug";

const cmdArgs = require("args-parser")(process.argv);

const ENV = {
    PORT: cmdArgs.port || process.env.PORT || 8080,
    DB_NAME: cmdArgs.dbName || process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: cmdArgs.dbHost || process.env.DB_HOST || "localhost",
    DB_PORT: cmdArgs.dbPort || process.env.DB_PORT || 27017,
    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: process.env.npm_package_version
};

debug({ENV});

export default ENV;