import {debug} from "./debug";
import {ValidationError} from "../exceptions/Errors";

const {validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');

export const run = work => (req, res, next) => {
    Promise
        .resolve(doWork(req, res, next, work))
        .catch(err => next(err));

};

const doWork = async (req, res, next, work) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        throw new ValidationError(validationErrors.mapped());
    }else {
        const body = await work(matchedData(req), req, res, next);
        res.json(body);
        debug("res", body);
    }
};