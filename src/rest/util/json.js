const wrap = require('./wrap');

module.exports = (fn) => wrap(async (req, res, next) => {
    res.json(await fn(req, res, next));
});