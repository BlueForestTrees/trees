import {arbre, eau, elec, skate, withQuantity} from "../../scenario/integ/testIntegDatabase";

export const normalTankSpec = {};

normalTankSpec.req = {
    qt: skate.quantity.qt,
    unit: skate.quantity.unit,
    _id: skate._id
};

normalTankSpec.res = {
    body: {
        _id: normalTankSpec.req._id,
        ...withQuantity(10,""),
        items: [
            {
                _id: eau._id,
                ...withQuantity(11500, "L")
            },
            {
                _id: elec._id,
                ...withQuantity(30000, "kwh")
            },
            {
                _id: arbre._id,
                ...withQuantity(0.005,"")
            }
        ]
    }
};