import {debug} from "../../test/testIntegPlumbing";

const {validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');

module.exports = run;

function run(work) {


    let validResultJson = async (req, res, next) => {
        debug("run", {url:`${req.method} ${req.url}`}, {params:req.params},{body: req.body});

        validationResult(req).throw();
        let result = await work(matchedData(req), req, res, next);

        debug("result", result);
        res.json(result);
    };

    return (req, res, next) => {


        let result = validResultJson(req, res, next);
        Promise
            .resolve(result)
            .catch(next);
    };
}

