import _ from 'lodash';
import {lait, gateauRoot, nameOf} from "../../scenario/integ/testIntegDatabase";
import {clon} from "../../testUtil";

export const getRoots = {};
const treeWithItsRootsFields = _.forEach(clon(gateauRoot.items), root => root.name = nameOf(root._id));
getRoots.req = {
    _id: gateauRoot._id
};
getRoots.res = {
    body: {
        _id:gateauRoot._id,
        items:treeWithItsRootsFields
    }
};

export const emptyGetRoot = {};
emptyGetRoot.req = {
    _id: lait._id
};
emptyGetRoot.res = {
    body: {
        _id:lait._id,
        items:[]
    }
};

//TODO test du get :id/:qt/:unit