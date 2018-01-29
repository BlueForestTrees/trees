import _ from 'lodash';
import {downTrunkNoQt, laRoot, nameOf, trunkQtRootsQt} from "../../scenario/integ/testIntegDatabase";
import {clon} from "../../testUtil";

export const getRoots = {};
const trunkId = trunkQtRootsQt._id;
const rootsWithItsTrunkFields = _.forEach(clon(laRoot.roots), root => root.name = nameOf(root._id));

getRoots.req = {
    _id: trunkId
};
getRoots.res = {
    body: {
        _id:trunkId,
        roots:rootsWithItsTrunkFields
    }
};

export const emptyGetRoot = {};
emptyGetRoot.req = {
    _id: downTrunkNoQt._id
};
emptyGetRoot.res = {
    body: {
        _id:downTrunkNoQt._id,
        roots:[]
    }
};