import _ from 'lodash';

const cached = (_id, cache) => _.find(cache, (e => e._id.equals(_id)));

const buildRoots = (coef, ressources, cache) => {
    const roots = [];
    if (ressources) {
        _.forEach(ressources, child => {
            const cachon = cached(child._id, cache);
            const qt = coef * child.qt;
            const unit = child.unit;

            roots.push({
                _id: cachon._id,
                name: cachon.name,
                qt, unit,
                roots: buildRoots(qt / cachon.qt, cachon.roots, cache)
            });
        });
    }
    return roots;
};

export const treefy = (qt, dbTree) => ({
    _id: dbTree._id,
    name: dbTree.name,
    quantity: dbTree.quantity,
    price: dbTree.price,
    roots: buildRoots(qt ? qt / dbTree.qt : 1, dbTree.roots, dbTree.cache),
    facets: dbTree.facets
});