import {getFullTrunk} from "../../service/trunk/getTrunkService";
import {getRoots} from "../../service/root/getRootService";

export const loadTree = async (_id, _qt, unit) => {

    const trunk = await getFullTrunk(_id);
    const roots = await getRoots(_id);

    return {...trunk,roots:roots.roots};
};
