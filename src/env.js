import {debug} from "./main/util/debug";

const ENV = {
    PORT: process.env.PORT || 8080,
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: process.env.npm_package_version
};

debug({ENV});

export default ENV;