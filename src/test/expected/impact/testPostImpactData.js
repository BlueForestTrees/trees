import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {replaceItem} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import {bleImpacts, farineTrunk} from "../../database/gateau";
import {prixImpactEntry, vitBImpactEntry} from "../../database/impactEntries";
import {withItem, withQuantity} from "../../testPlumbing";

export const firstImpactSpec = {};
firstImpactSpec.req = {
    _id: farineTrunk._id,
    body: {
        impact: withItem(prixImpactEntry._id, 144, "m2")
    }
};
firstImpactSpec.res = {
    body: oneUpsertedResponse(farineTrunk._id)
};
firstImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: {
            _id: farineTrunk._id,
            items: [
                withItem(prixImpactEntry._id, 144, "m2")
            ],

        }
    }
};

export const thirdImpact = {};
const trunkId = bleImpacts._id;

thirdImpact.req = {
    _id: trunkId,
    body: {impact: withItem(prixImpactEntry._id, 144, "m2")}
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
                withItem(prixImpactEntry._id, 144, "m2")
            ],

        }
    }
};


export const updatingBleImpactSpec = {};
updatingBleImpactSpec.req = {
    _id: bleImpacts._id,
    body: {
        impact: withItem(vitBImpactEntry._id, 14, "m")
    }
};
updatingBleImpactSpec.res = {
    body: oneModifiedResponse
};
updatingBleImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: replaceItem(bleImpacts, "items", withItem(vitBImpactEntry._id, 14, "m"))
    }
};