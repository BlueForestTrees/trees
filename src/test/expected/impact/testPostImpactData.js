import {oneModifiedResponse, oneUpsertedResponse} from "../testCommonData";
import {replaceItem} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import {bleImpacts, farineTrunk} from "../../database/gateau";
import {prixImpactEntry, vitBImpactEntry} from "../../database/impactEntries";
import {withItem, withQuantity} from "../../util/testPlumbing";

export const farineCreatingImpactSpec = {};
farineCreatingImpactSpec.req = {
    _id: farineTrunk._id,
    body: {
        impact: withItem(prixImpactEntry._id, 144, "m2")
    }
};
farineCreatingImpactSpec.res = {
    body: oneUpsertedResponse(farineTrunk._id)
};
farineCreatingImpactSpec.db = {
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

export const bleAddingImpactSpec = {};
const trunkId = bleImpacts._id;

bleAddingImpactSpec.req = {
    _id: trunkId,
    body: {impact: withItem(prixImpactEntry._id, 144, "m2")}
};

bleAddingImpactSpec.res = {
    body: oneModifiedResponse
};

bleAddingImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: {
            _id: trunkId,
            ...withQuantity(10, "kg"),
            items: [
                ...bleImpacts.items,
                withItem(prixImpactEntry._id, 144, "m2")
            ],

        }
    }
};

export const bleUpdatingImpactSpec = {};
bleUpdatingImpactSpec.req = {
    _id: bleImpacts._id,
    body: {
        impact: withItem(vitBImpactEntry._id, 14, "m")
    }
};
bleUpdatingImpactSpec.res = {
    body: oneModifiedResponse
};
bleUpdatingImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: replaceItem(bleImpacts, "items", withItem(vitBImpactEntry._id, 14, "m"))
    }
};