#!/usr/bin/env node


import {dbConnect} from "./repo";
import {eagerInit, initErrors, initExpress, listen} from "./server";
import express from 'express';

export const app = express();

initExpress(app)
    .then(initErrors)
    .then(dbConnect)
    .then(eagerInit)
    .then(listen);