#!/usr/bin/env node

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from "path";
import read from 'fs-readdir-recursive';
import _ from 'lodash';
import env from "../../config/env";
import {debug} from "../test/testIntegPlumbing";

export const app = express();

if(env.env === 'PRODUCTION') {
    app.use(require('morgan')(':status :method :url :response-time ms - :res[content-length]'));
}else{
    app.use(require('morgan')(':status :method :url :response-time ms - :res[content-length]'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

read(path.join(__dirname, "rest")).forEach(function (file) {
    file.indexOf(".js") > 1 && app.use(require("./rest/" + file));
});

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {

    //erreur de validation.
    if (err.mapped) {
        let error = err.mapped();
        debug("VALIDATION ERROR HANDLER", error);
        res.status(422).json(error);
    } else {
        console.log("ERROR HANDLER", err.status || 500, err.stack);
        res.status(err.status || 500).json({message: err.message});
    }
});

app.listen(env.port, () => {
    console.log('App listening on port %s, in environment %s!', env.port, _.toUpper(env.env || ''));
});