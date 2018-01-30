import {peekTrunk} from "../service/trunk/getTrunkService";
import {getRoots} from "../service/root/getRootService";
import _ from 'lodash';

export const loadRoots = async trunkId => ({
    _id: trunkId,
    items: await getRoots(trunkId).then(populateRoots)
});

const populateRoots = roots => roots ? Promise.all(
    _.map(roots.items, root =>
        peekTrunk(root._id)
            .then(t => ({...root, name: t.name}))
    )) : [];
