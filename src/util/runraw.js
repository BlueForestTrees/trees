import {objId} from "./sanitize";

export const runraw = work => {
    let validResultJson = async (req, res, next) => {
        res.json(await work(objId(req.body), res, next));
    };

    return (req, res, next) => {
        Promise
            .resolve(validResultJson(req, res, next))
            .catch(next);
    };
};
