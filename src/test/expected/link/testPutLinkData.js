import {setQuantityRootSpec, updateQuantityAnotherUnitRootSpec, updateQuantityRootSpec} from "../root/testPutRootData";
import {setQuantityBranchSpec, updateQuantityAnotherUnitBranchSpec, updateQuantityBranchSpec} from "../branch/testPutBranchData";

export const setQuantityLinkSpec = {};
setQuantityLinkSpec.req = setQuantityRootSpec.req;
setQuantityLinkSpec.res = {
    body: [setQuantityRootSpec.res.body, setQuantityBranchSpec.res.body]
};
setQuantityLinkSpec.db = {
    expected: {
        list: [setQuantityRootSpec.db.expected, setQuantityBranchSpec.db.expected]
    }
};


export const updateQuantityLinkSpec = {};
updateQuantityLinkSpec.req = updateQuantityRootSpec.req;
updateQuantityLinkSpec.res = {
    body: [updateQuantityRootSpec.res.body, updateQuantityBranchSpec.res.body]
};
updateQuantityLinkSpec.db = {
    expected: {
        list: [updateQuantityRootSpec.db.expected, updateQuantityRootSpec.db.expected]
    }
};

export const updateQuantityAnotherUnitLinkSpec = {};
updateQuantityAnotherUnitLinkSpec.req = updateQuantityAnotherUnitRootSpec.req;
updateQuantityAnotherUnitLinkSpec.res = {
    body: [updateQuantityAnotherUnitRootSpec.res.body, updateQuantityAnotherUnitBranchSpec.res.body]
};
updateQuantityAnotherUnitLinkSpec.db = {
    expected: {
        list: [updateQuantityAnotherUnitRootSpec.db.expected, updateQuantityAnotherUnitBranchSpec.db.expected]
    }
};