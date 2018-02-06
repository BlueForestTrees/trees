import {eau, elec, skate, withQuantity} from "../../scenario/integ/testIntegDatabase";

export const normalTank = {};

normalTank.req = {
    _id: skate._id
};

normalTank.res = {
    body: {
        _id: normalTank.req._id,
        items: [
            {
                _id: elec._id,
                ...withQuantity(15, "kwh")
            },
            {
                _id: eau._id,
                ...withQuantity(150, "L")
            }
        ]
    }
};