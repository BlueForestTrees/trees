import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import {matchId, withId, withIdQtUnit} from "mongo-queries-blueforest"
import {applyQuantity, erreurSiUnitIncompatibles, treefy} from "../../util/calculations"

const roots = () => col(cols.ROOT)

const rootGraphLookup = {
    $graphLookup: {
        from: cols.ROOT,
        startWith: `$items._id`,
        connectFromField: "items._id",
        connectToField: "_id",
        maxDepth: 10,
        as: "cache"
    }
}

export const readRoot = _id => roots().findOne(withId(_id))

export const readRootTree = (qt, unit, _id) =>
    getRootGraph(_id)
        .then(graph => graph && treefy({qt, unit}, graph))
        .then(tree => tree || {...withIdQtUnit(_id, qt, unit), items: []})

const getRootGraph = _id => roots().aggregate([matchId(_id), rootGraphLookup]).next()

import {removeQuantity} from "mongo-queries-blueforest"

export const loadNamedUnquantifiedRoot = _id =>
    loadRoots(_id)
        .then(removeQuantity)

export const loadNamedQuantifiedRoot = async (qt, unit, _id) =>
    loadRoots(_id)
        .then(roots => erreurSiUnitIncompatibles({qt, unit}, roots))
        .then(roots => applyQuantity({qt, unit}, roots))

const loadRoots = _id =>
    readRoot(_id)
        .then(roots => roots || {_id, items: []})