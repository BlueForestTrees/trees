import {oneModifiedResponse} from "../testCommonData";
import {clon} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import _ from 'lodash';
import {bleTrunk, farineTrunk, gateauTrunk, gateauRoot, laitTrunk} from "../../database/gateau";
import {setQuantity} from "../../util/testPlumbing";
import {setQuantityRootSpec, updateQuantityAnotherUnitRootSpec, updateQuantityRootSpec} from "../root/testPutRootData";
import {setQuantityBranchSpec, updateQuantityAnotherUnitBranchSpec, updateQuantityBranchSpec} from "../branch/testPutBranchData";
import {searchTrunkSpec as updateQuantityAnotherUnitSpec} from "../trunk/testGetTrunkData";

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