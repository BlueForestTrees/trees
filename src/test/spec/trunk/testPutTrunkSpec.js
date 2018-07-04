import {oneModifiedResponse} from "../testCommonSpec";
import {cols} from "../../../main/const/collections";
import _ from 'lodash';
import {bleTrunk, gateauTrunk} from "../../database/gateau";
import {withQuantity} from "../../util/testUtil";


const someNewName = "paPRika" + Math.random();
export const renameTrunkSpec = {
    req: {
        method: "PUT",
        url: `/api/trunk/${bleTrunk._id}`,
        body: {
            name: someNewName
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.TRUNK,
            doc: {
                _id: bleTrunk._id,
                color: bleTrunk.color,
                name: someNewName,
                name_lower: someNewName.toLowerCase()
            }
        }
    }
};


const newGateauQuantity = withQuantity(1, "kg").quantity;
export const requantifyTrunkSpec = {
    req: {
        method: "PUT",
        url: `/api/trunk/${gateauTrunk._id}`,
        body: {
            quantity: newGateauQuantity
        }
    }, res: {
        body: oneModifiedResponse
    }, db: {
        expected: {
            colname: cols.TRUNK,
            doc: {
                ...(_.omit(gateauTrunk, 'quantity')),
                quantity: newGateauQuantity
            }
        }
    }
};

export const noUnitPutTrunkSpec = {
    req: {
        method: "PUT",
        url: `/api/trunk/${gateauTrunk._id}`,
        body: {
            quantity: {qt: 4}
        }
    }, res: {
        code:400
    }
};