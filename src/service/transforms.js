const _ = require('lodash');
const cached = (_id, cache) => _.find(cache, (e => e._id.equals(_id)));

const buildRoots = (coef, ressources, cache) => {
    const roots = [];
    if (ressources) {
        _.forEach(ressources, child => {
            const cachon = cached(child._id, cache);
            const qt = coef * child.qt;

            roots.push({
                _id: cachon._id,
                name: cachon.name,
                qt: qt,
                roots: buildRoots(qt / cachon.qt, cachon.ressources, cache)
            });
        });
    }
    return roots;
};

module.exports = {
    treefy: (qt, dbTree) => ({
        _id: dbTree._id,
        name: dbTree.name,
        qt: qt ? qt : dbTree.qt || null,
        quantity: dbTree.quantity,
        price: dbTree.price,
        roots: buildRoots(qt ? qt / dbTree.qt : 1, dbTree.ressources, dbTree.cache),
        facets: dbTree.facets
    })
};