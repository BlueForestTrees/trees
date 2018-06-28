import {debug} from "./main/util/debug";

const ENV = {
    USER_NAME: process.env.USER_NAME || "blue",
    USER_PASSWORD: process.env.USER_PASSWORD || "forest",
    USER_ADMIN: process.env.USER_ADMIN || true,
    PORT: process.env.PORT || 8080,
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: process.env.npm_package_version,
    MORGAN: process.env.MORGAN || ':status :method :url :response-time ms - :res[content-length]',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'fqse6}@@@#{tc\'uauauaua_f\'}_^@{}@_{{}#~@26nt8/z(_ic;ç(_q206az\'\"tct;çp_²²\\\\\\\"'
};

debug({ENV});

export default ENV;