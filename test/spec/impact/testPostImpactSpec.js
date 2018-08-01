import {oneModifiedResponse} from "api-test/dist/domain"
import {replaceItem} from "api-test/dist/domain"
import {cols} from "../../../src/const/collections"
import {bleImpacts, farineTrunk} from "../../database/gateau"
import {prixImpactEntry, vitBImpactEntry} from "../../database/impactEntries"
import {withIdQuantity} from "api-test/dist/domain"

export const farineCreatingImpactSpec = {
    req: {
        url: `/api/impact`,
        method: "POST",
        body: {
            trunk: withIdQuantity(farineTrunk._id, 45, "m2"),
            impact: withIdQuantity(prixImpactEntry._id, 144, "m2")
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.IMPACT,
            doc: {
                ...withIdQuantity(farineTrunk._id, 45, "m2"),
                items: [
                    withIdQuantity(prixImpactEntry._id, 144, "m2")
                ],
            }
        }
    }
}

export const bleAddingImpactSpec = {
    req: {
        url: `/api/impact`,
        method: "POST",
        body: {
            trunk: withIdQuantity(bleImpacts._id, 10, "kg"),
            impact: withIdQuantity(prixImpactEntry._id, 144, "m2")
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
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
    }
}

export const bleAddingImpactSpec2 = {
    req: {
        url: `/api/impact`,
        method: "POST",
        body: {
            trunk: withIdQuantity(bleImpacts._id, 5, "kg"),
            impact: withIdQuantity(prixImpactEntry._id, 144, "m2")
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
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
    }
}


export const bleUpdatingImpactSpec = {
    req: {
        url: `/api/impact`,
        method: "POST",
        body: {
            trunk: withIdQuantity(bleImpacts._id, 5, "kg"),
            impact: withIdQuantity(vitBImpactEntry._id, 20, "mmol")
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.IMPACT,
            doc: replaceItem(bleImpacts, "items", withIdQuantity(vitBImpactEntry._id, 40, "mmol"))
        }
    }
}
