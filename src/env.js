const debug = require('debug')('api:tree')
import {version, name} from './../package.json'
import fs from 'fs'

const ENV = {
    NAME:name,
    PORT: process.env.PORT || 80,
    
    REST_PATH: process.env.REST_PATH || "rest",

    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_USER: process.env.DB_USER || "doudou",
    DB_PWD: process.env.DB_PWD || "masta",
    
    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: version,
    MORGAN: process.env.MORGAN || ':status :method :url :response-time ms - :res[content-length]',

    RK_TRUNK_UPSERT: process.env.RK_TRUNK_UPSERT || "trunk-upsert",
    RK_TRUNK_DELETE: process.env.RK_TRUNK_DELETE || "trunk-delete",
    RK_ROOT_UPSERT: process.env.RK_ROOT_UPSERT || "root-upsert",
    RK_ROOT_DELETE: process.env.RK_ROOT_DELETE || "root-delete",
    RB_PATH: process.env.RB_PATH || "mq.json"
}

ENV.RB = JSON.parse(fs.readFileSync(ENV.RB_PATH, 'utf8'))

debug(JSON.stringify(ENV))

export default ENV