import _ from 'lodash';
import {laRoot, topTrunkQt} from "../data/database";

export const tree = {};
tree.req = {
    _id: topTrunkQt._id
};
tree.res = {
    body: {
        ..._.omit(topTrunkQt,'name_lower'),
        roots: laRoot.roots
    }
};