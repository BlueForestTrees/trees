#!/usr/bin/env node

import {dbConnect} from "./repo";
import {eagerInit, initErrors, initExpress, listen} from "./server";

initExpress()
    .then(initErrors)
    .then(dbConnect)
    .then(eagerInit)
    .then(listen);