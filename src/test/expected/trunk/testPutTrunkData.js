import {oneModifiedResponse} from "../testCommonData";
import {cols} from "../../../main/const/collections";
import _ from 'lodash';
import {bleTrunk, gateauTrunk} from "../../database/gateau";
import {withQuantity} from "../../testPlumbing";


export const renameTrunkSpec = {};
const someNewName = "paPRika" + Math.random();
let _id = bleTrunk._id;
renameTrunkSpec.req = {
    params: {_id},
    body: {
        name: someNewName
    }
};
renameTrunkSpec.res = {
    body: oneModifiedResponse
};
renameTrunkSpec.db = {
    expected: {
        colname: cols.TRUNK,
        doc: {
            _id,
            ...renameTrunkSpec.req.body,
            name_lower: renameTrunkSpec.req.body.name.toLowerCase()
        }
    }
};


export const requantifyTrunkSpec = {};
const newGateauQuantity = withQuantity(1, "kg").quantity;
requantifyTrunkSpec.req = {
    params: {_id: gateauTrunk._id},
    body: {
        quantity: newGateauQuantity
    }
};
requantifyTrunkSpec.res = {
    body: oneModifiedResponse
};
requantifyTrunkSpec.db = {
    expected: {
        colname: cols.TRUNK,
        doc: {
            ...(_.omit(gateauTrunk, 'quantity')),
            quantity: newGateauQuantity
        }
    }
};