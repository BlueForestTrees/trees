import {readRootTree} from "../service/root/getRootService";

export const getTank = (qt, unit, _id) => readRootTree(qt, unit, _id).then(tankfy);

const tankfy = tree => {

    return tree;
};