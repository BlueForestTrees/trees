const _ = require('lodash');

const bothNull = (left, right) => _.isNull(left) && _.isNull(right);
const bothNotNull = (left, right) => !_.isNull(left) && !_.isNull(right);
const bothOrNone = (left, right) => bothNull(left, right) || bothNotNull(left, right);

module.exports = {
    bothOrNone
};