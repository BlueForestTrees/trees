import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from "path";
import read from 'fs-readdir-recursive';
import {debug} from "./util/debug";
import env from "../../config/env";
import {initUnits} from "trees-common/dist/units";
import {unitData} from "./service/unit/grandeurService";

export const initExpress = app => {

    app.use(require('morgan')(':status :method :url :response-time ms - :res[content-length]'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    read(path.join(__dirname, "rest")).forEach(function (file) {
        file.indexOf(".js") > 1 && app.use(require("./rest/" + file));
    });

    return Promise.resolve(app);
};

export const initErrors = app => {
    app.use(function (req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {
        if (err.mapped) {
            const mapped = err.mapped();
            debug("VALIDATION ERROR HANDLER", mapped);
            res.status(422).json(mapped);
        } else {
            console.error("ERROR HANDLER", err.stack);
            res.status(err.status || 500).json({message: err.message});
        }
    });
    return app;
};

export const listen = app => {
    app.listen(env.port, () => {
        console.log('App listening on port %s, in environment %s!', env.port, _.toUpper(env.env || ''));
    });
    return app;
};

export const eagerInit = app => {

   // unitData
   //     .then(initUnits);

    return app;
};