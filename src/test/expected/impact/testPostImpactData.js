import {oneModifiedResponse} from "../testCommonData";
import {replaceItem} from "../../util/testIntegApp";
import {cols} from "../../../main/const/collections";
import {bleImpacts, farineTrunk} from "../../database/gateau";
import {prixImpactEntry, vitBImpactEntry} from "../../database/impactEntries";
import {withItem} from "../../util/testIntegApp";

export const farineCreatingImpactSpec = {};
farineCreatingImpactSpec.req = {
    body: {
        trunk: withItem(farineTrunk._id, 45, "m2"),
        impact: withItem(prixImpactEntry._id, 144, "m2")
    }
};
farineCreatingImpactSpec.res = {
    body: oneModifiedResponse
};
farineCreatingImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: {
            ...withItem(farineTrunk._id, 45, "m2"),
            items: [
                withItem(prixImpactEntry._id, 144, "m2")
            ],
        }
    }
};

export const bleAddingImpactSpec = {};

bleAddingImpactSpec.req = {
    body: {
        trunk: withItem(bleImpacts._id, 10, "kg"),
        impact: withItem(prixImpactEntry._id, 144, "m2")
    }
};

bleAddingImpactSpec.res = {
    body: oneModifiedResponse
};

bleAddingImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: {
            ...withItem(bleImpacts._id, 10, "kg"),
            items: [
                ...bleImpacts.items,
                withItem(prixImpactEntry._id, 144, "m2")
            ],

        }
    }
};

export const bleAddingImpactSpec2 = {};

bleAddingImpactSpec2.req = {
    body: {
        trunk: withItem(bleImpacts._id, 5, "kg"),
        impact: withItem(prixImpactEntry._id, 144, "m2")
    }
};

bleAddingImpactSpec2.res = {
    body: oneModifiedResponse
};

bleAddingImpactSpec2.db = {
    expected: {
        colname: cols.IMPACT,
        doc: {
            ...withItem(bleImpacts._id, 10, "kg"),
            items: [
                ...bleImpacts.items,
                withItem(prixImpactEntry._id, 288, "m2")
            ],

        }
    }
};

export const bleUpdatingImpactSpec = {};
bleUpdatingImpactSpec.req = {
    body: {
        trunk: withItem(bleImpacts._id, 5, "kg"),
        impact: withItem(vitBImpactEntry._id, 20, "mmol")
    }
};
bleUpdatingImpactSpec.res = {
    body: oneModifiedResponse
};
bleUpdatingImpactSpec.db = {
    expected: {
        colname: cols.IMPACT,
        doc: replaceItem(bleImpacts, "items", withItem(vitBImpactEntry._id, 40, "mmol"))
    }
};