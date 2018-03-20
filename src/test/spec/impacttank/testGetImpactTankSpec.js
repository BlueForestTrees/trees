import {withQuantity} from "../../util/testUtil";
import {ObjectID} from "mongodb";
import {papierVA} from "../../database/papier";
import {co2eImpactEntry, vitBImpactEntry, vitCImpactEntry} from "../../database/impactEntries";
import {gateauItem, gateauTrunk} from "../../database/gateau";


export const papierAImpactTankSpec = {};
papierAImpactTankSpec.req = {
    _id: papierVA._id,
    quantity: {qt: papierVA.quantity.qt, unit: papierVA.quantity.unit}
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

export const gateauImpactTankSpec = {};
gateauImpactTankSpec.req = {
    _id: gateauTrunk._id,
    quantity: gateauItem.quantity
};
gateauImpactTankSpec.res = {
    body: {
        _id: gateauTrunk._id,
        quantity: gateauItem.quantity,
        items: [{
            "_id": vitCImpactEntry._id,
            "quantity": {
                "qt": 10,
                "unit": "mol"
            },
            "name": "Ivitamine C"
        },
            {
                "_id": vitBImpactEntry._id,
                "quantity": {
                    "qt": 0.1,
                    "unit": "mol"
                },
                "name": "Ivitamine B"
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