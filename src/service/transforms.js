const _ = require('lodash');
const cached = (_id, cache) => _.find(cache, (e => e._id.equals(_id)));

const buildRoots = (coef, childList, cache) => {
    const roots = [];
    if (childList) {
        _.forEach(childList, child => {
            const cachon = cached(child._id, cache);
            const qt = coef * child.qt;
            roots.push({
                _id: cachon._id, name: cachon.name, qt: qt,
                roots: buildRoots(qt / cachon.qt || 1, cachon.childList, cache)
            });
        });
    }
    return roots;
};

const treefy = dbTree => ({
    _id: dbTree._id, name: dbTree.name, qt: dbTree.qt,
    roots: buildRoots(1, dbTree.childList, dbTree.cache)
});

module.exports = {
    treefy
};