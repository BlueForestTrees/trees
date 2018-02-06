import {oneModifiedResponse} from "../testCommonData";
import {ble, gateau, withQuantity} from "../../scenario/integ/testIntegDatabase";
import {cols} from "../../../main/const/collections";
import _ from 'lodash';

const someNewName = "paPRika" + Math.random();

export const trunkRename = {};

let _id = ble._id;
trunkRename.req = {
    params: {_id},
    body: {
        name: someNewName
    }
};
trunkRename.res = {
    body: oneModifiedResponse
};

trunkRename.db = {
    expected: {
        colname: cols.TRUNK,
        doc: {
            _id,
            ...trunkRename.req.body,
            name_lower: trunkRename.req.body.name.toLowerCase()
        }
    }
};


const newGateauQuantity = withQuantity(1,"kg").quantity;

export const trunkRequantify = {};

trunkRequantify.req = {
    params: {_id: gateau._id},
    body: {
        quantity: newGateauQuantity
    }
};
trunkRequantify.res = {
    body: oneModifiedResponse
};

trunkRequantify.db = {
    expected: {
        colname: cols.TRUNK,
        doc: {
            ...(_.omit(gateau, 'quantity')),
            quantity: newGateauQuantity
        }
    }
};