import {withQuantity} from "../../testPlumbing";
import {ObjectID} from "mongodb";
import {papierVA} from "../../database/papier";
import {co2eImpactEntry} from "../../database/impactEntries";


export const papierAImpactTankSpec = {};
papierAImpactTankSpec.req = {
    _id: papierVA._id,
    quantity: papierVA.quantity
};
papierAImpactTankSpec.res = {
    body: {
        _id: papierVA._id,
        quantity: papierVA.quantity,
        items: [{
            _id: co2eImpactEntry._id,
            name: "équivalent CO2",
            ...withQuantity(11696000, "g")
        }]
    }
};

export const sansImpactTankSpec = {};
const unknownId = ObjectID().toString();
sansImpactTankSpec.req = {
    _id: unknownId,
    ...withQuantity(3, "L")
};
sansImpactTankSpec.res = {
    body: {
        _id: unknownId,
        ...withQuantity(3, "L"),
        items: []
    }
};