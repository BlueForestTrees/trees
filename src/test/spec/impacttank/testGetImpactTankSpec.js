import {withQuantity} from "../../util/testUtil";
import {ObjectID} from "mongodb";
import {papierVA} from "../../database/papier";
import {co2eImpactEntry, vitBImpactEntry, vitCImpactEntry} from "../../database/impactEntries";
import {gateauItem, gateauTrunk} from "../../database/gateau";
import _ from 'lodash';

export const papierAImpactTankSpec = {
    req: {
        url: `/api/impacttank/${papierVA.quantity.qt}/${papierVA.quantity.unit}/${papierVA._id}`
    },
    res: {
        body: {
            _id: papierVA._id,
            quantity: papierVA.quantity,
            items: [{
                ..._.pick(co2eImpactEntry, ['_id', 'name', 'color']),
                ...withQuantity(11696000, "g")
            }]
        }
    }
};

export const gateauImpactTankSpec = {
    req: {
        url: `/api/impacttank/${gateauItem.quantity.qt}/${gateauItem.quantity.unit}/${gateauTrunk._id}`,
    },
    res: {
        body: {
            _id: gateauTrunk._id,
            quantity: gateauItem.quantity,
            items: [{
                ..._.pick(vitCImpactEntry, ['_id', 'name', 'color']),
                "quantity": {
                    "qt": 10,
                    "unit": "mol"
                }
            },
                {
                    ..._.pick(vitBImpactEntry, ['_id', 'name', 'color']),
                    "quantity": {
                        "qt": 0.1,
                        "unit": "mol"
                    }
                }]
        }
    }
};

const unknownId = ObjectID().toString();
export const sansImpactTankSpec = {
    req: {
        url: `/api/impacttank/3/L/${unknownId}`
    },
    res: {
        body: {
            _id: unknownId,
            ...withQuantity(3, "L"),
            items: []
        }
    }
};