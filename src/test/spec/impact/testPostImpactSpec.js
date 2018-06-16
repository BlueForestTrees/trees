import {oneModifiedResponse} from "../testCommonSpec";
import {replaceItem} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import {bleImpacts, farineTrunk} from "../../database/gateau";
import {prixImpactEntry, vitBImpactEntry} from "../../database/impactEntries";
import {withIdQuantity} from "../../util/testUtil";

export const farineCreatingImpactSpec = {};
farineCreatingImpactSpec.req = {
    body: {
        trunk: withIdQuantity(farineTrunk._id, 45, "m2"),
        impact: withIdQuantity(prixImpactEntry._id, 144, "m2")
    }
};
farineCreatingImpactSpec.res = {
    body: oneModifiedResponse
};
farineCreatingImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: {
            ...withIdQuantity(farineTrunk._id, 45, "m2"),
            items: [
                withIdQuantity(prixImpactEntry._id, 144, "m2")
            ],
        }
    }
};

export const bleAddingImpactSpec = {};

bleAddingImpactSpec.req = {
    body: {
        trunk: withIdQuantity(bleImpacts._id, 10, "kg"),
        impact: withIdQuantity(prixImpactEntry._id, 144, "m2")
    }
};

bleAddingImpactSpec.res = {
    body: oneModifiedResponse
};

bleAddingImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: {
            ...withIdQuantity(bleImpacts._id, 10, "kg"),
            items: [
                ...bleImpacts.items,
                withIdQuantity(prixImpactEntry._id, 144, "m2")
            ],

        }
    }
};

export const bleAddingImpactSpec2 = {};

bleAddingImpactSpec2.req = {
    body: {
        trunk: withIdQuantity(bleImpacts._id, 5, "kg"),
        impact: withIdQuantity(prixImpactEntry._id, 144, "m2")
    }
};

bleAddingImpactSpec2.res = {
    body: oneModifiedResponse
};

bleAddingImpactSpec2.db = {
    expected: {
        colname: cols.IMPACT,
        doc: {
            ...withIdQuantity(bleImpacts._id, 10, "kg"),
            items: [
                ...bleImpacts.items,
                withIdQuantity(prixImpactEntry._id, 288, "m2")
            ],

        }
    }
};

export const bleUpdatingImpactSpec = {};
bleUpdatingImpactSpec.req = {
    body: {
        trunk: withIdQuantity(bleImpacts._id, 5, "kg"),
        impact: withIdQuantity(vitBImpactEntry._id, 20, "mmol")
    }
};
bleUpdatingImpactSpec.res = {
    body: oneModifiedResponse
};
bleUpdatingImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: replaceItem(bleImpacts, "items", withIdQuantity(vitBImpactEntry._id, 40, "mmol"))
    }
};