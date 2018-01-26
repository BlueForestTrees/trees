#!/usr/bin/env node

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from "path";
import read from 'fs-readdir-recursive';
import _ from 'lodash';

const app = express();
app.use(logger(':status :method :url :response-time ms - :res[content-length]'));
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
        console.error(err.stack, "\nResponse: ", err.mapped());
        res.status(422).json(err.mapped());
    } else {
        console.error(err);
        res.status(err.status || 500).json({error: err.stack.split("\n")});
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('App listening on port %s, in environment %s!', port, _.toUpper(process.env.NODE_ENV || ''));
});

module.exports = app;