import {withQuantity} from "../../testPlumbing";
import {ObjectID} from "mongodb";
import {papierVA} from "../../database/papier";
import {co2eImpact} from "../../database/impactEntries";


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
            _id: co2eImpact._id,
            ...withQuantity(11696, "kg")
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