import {eau, elec, skate, withQuantity} from "../../scenario/integ/testIntegDatabase";

export const normalTankSpec = {};

normalTankSpec.req = {
    qt: skate.quantity.qt,
    unit: skate.quantity.unit,
    _id: skate._id
};

console.log(normalTankSpec);

normalTankSpec.res = {
    body: {
        _id: normalTankSpec.req._id,
        items: [
            {
                _id: elec._id,
                ...withQuantity(30000, "kwh")
            },
            {
                _id: eau._id,
                ...withQuantity(11500, "L")
            }
        ]
    }
};