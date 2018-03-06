#!/usr/bin/env node
import {createExpress, initExpress, listen} from "./express";
import {dbConnect} from "./db";
import {initServices} from "./services";

export const express = createExpress();

dbConnect()
    .then(initServices)
    .then(() => initExpress(express))
    .then(() => listen(express));

export const app = express;