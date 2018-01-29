import {peekTrunk} from "../service/trunk/getTrunkService";
import {getRoots} from "../service/root/getRootService";
import _ from 'lodash';

export const loadRoots = async trunkId => ({
    _id: trunkId,
    roots: await getRoots(trunkId).then(populateRoots)
});

const populateRoots = roots => roots ? Promise.all(
    _.map(roots.roots, root =>
        peekTrunk(root._id)
            .then(t => ({...root, name: t.name}))
    )) : [];
