import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {replaceItem} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import {bleImpacts, farine} from "../../database/gateau";
import {prixImpactEntry, vitBImpactEntry} from "../../database/impactEntries";
import {withIdQuantity, withQuantity} from "../../testPlumbing";

export const firstImpactSpec = {};
firstImpactSpec.req = {
    _id: farine._id,
    body: {
        impact: withIdQuantity(prixImpactEntry._id, 144, "m2")
    }
};
firstImpactSpec.res = {
    body: oneUpsertedResponse(farine._id)
};
firstImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: {
            _id: farine._id,
            items: [
                withIdQuantity(prixImpactEntry._id, 144, "m2")
            ],

        }
    }
};

export const thirdImpact = {};
const trunkId = bleImpacts._id;

thirdImpact.req = {
    _id: trunkId,
    body: {impact: withIdQuantity(prixImpactEntry._id, 144, "m2")}
};

thirdImpact.res = {
    body: oneModifiedResponse
};

thirdImpact.db = {
    expected: {
        colname: cols.IMPACT,
        doc: {
            _id: trunkId,
            ...withQuantity(10,"kg"),
            items: [
                ...bleImpacts.items,
                withIdQuantity(prixImpactEntry._id, 144, "m2")
            ],

        }
    }
};


export const updatingBleImpactSpec = {};
updatingBleImpactSpec.req = {
    _id: bleImpacts._id,
    body: {
        impact: withIdQuantity(vitBImpactEntry._id, 14, "m")
    }
};
updatingBleImpactSpec.res = {
    body: oneModifiedResponse
};
updatingBleImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: replaceItem(bleImpacts, "items", withIdQuantity(vitBImpactEntry._id, 14, "m"))
    }
};