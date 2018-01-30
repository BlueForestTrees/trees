import _ from 'lodash';
import {downTrunkNoQt, laRoot, nameOf, trunkQtRootsQt} from "../../scenario/integ/testIntegDatabase";
import {clon} from "../../testUtil";

export const getRoots = {};
const rootsWithItsTrunkFields = _.forEach(clon(laRoot.items), root => root.name = nameOf(root._id));
getRoots.req = {
    _id: laRoot._id
};
getRoots.res = {
    body: {
        _id:laRoot._id,
        items:rootsWithItsTrunkFields
    }
};

export const emptyGetRoot = {};
emptyGetRoot.req = {
    _id: downTrunkNoQt._id
};
emptyGetRoot.res = {
    body: {
        _id:downTrunkNoQt._id,
        items:[]
    }
};