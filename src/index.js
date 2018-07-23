import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from "path";
import read from 'fs-readdir-recursive';
import {debug} from "trees-test/dist/util";
import express from 'express';
import ENV from "./env";
import morgan from 'morgan';
import {dbInit} from "trees-db-version/dist";
import {initServices} from "./services";
import {registry} from "./db/dbRegistry";

console.log("API starting...");

const api = express();

const httpConf = () => {
    api.use(morgan(ENV.MORGAN));
    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({extended: false}));
    api.use(cookieParser());
};

const logRequest = () => {
    api.use(function (req, res, next) {
        debug("req", {user: req.token && req.token.user, url: `${req.method} ${req.url}`}, {params: req.params}, {body: req.body});
        next();
    });
};

const rest = () => {
    read(path.join(__dirname, "rest")).forEach(function (file) {
        file.indexOf(".js") > 1 && api.use(require("./rest/" + file));
    });
};

const notFoundMiddleware = () => {
    api.use(function (req, res, next) {
        const err = new Error();
        err.status = 404;
        next(err);
    });
};

const errorMiddleware = () => {
    api.use(function (err, req, res, next) {
        res.status(err.status || 500);
        let responseBody = null;
        if (err.body) {
            responseBody = err.body;
        } else if (err.message) {
            responseBody = {error: err.message};
        }
        res.json(responseBody);
        debug("res", responseBody);
    })
};

const listen = () => {
    console.log("API listening on " + ENV.PORT + "...");
    return api.listen(ENV.PORT);
};

const started = () => {
    console.log("API started.");
    return api;
};

export default dbInit(ENV, registry)
        .then(initServices)
        .then(httpConf)
        .then(logRequest)
        .then(rest)
        .then(notFoundMiddleware)
        .then(errorMiddleware)
        .then(listen)
        .then(started);
