import {debug} from "./debug";

const {validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');

export const run = work => (req, res, next) => {
    debug("request", {url: `${req.method} ${req.url}`}, {params: req.params}, {body: req.body});
    Promise
        .resolve(doWork(req, res, next, work))
        .catch(err => {
            return next(err);
        });

};

const doWork = async (req, res, next, work) => {
    validationResult(req).throw();
    let result = await work(matchedData(req), req, res, next);
    res.json(result);
    debug("result", result);
};
