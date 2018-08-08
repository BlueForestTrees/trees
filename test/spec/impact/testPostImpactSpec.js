import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {replaceItem} from "test-api-express-mongo/dist/domain"
import {cols} from "../../../src/const/collections"
import {bleImpacts, farineTrunk} from "../../database/gateau"
import {prixImpactEntry, vitBImpactEntry} from "../../database/impactEntries"
import {withIdBqtG} from "test-api-express-mongo/dist/domain"

export const farineCreatingImpactSpec = {
    req: {
        url: `/api/impact`,
        method: "POST",
        body: {
            trunk: withIdBqtG(farineTrunk._id, 45, "m2"),
            impact: withIdBqtG(prixImpactEntry._id, 144, "m2")
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.IMPACT,
            doc: {
                ...withIdBqtG(farineTrunk._id, 45, "m2"),
                items: [
                    withIdBqtG(prixImpactEntry._id, 144, "m2")
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
            trunk: withIdBqtG(bleImpacts._id, 5, "kg"),
            impact: withIdBqtG(prixImpactEntry._id, 144, "m2")
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.IMPACT,
            doc: {
                ...withIdBqtG(bleImpacts._id, 10, "kg"),
                items: [
                    ...bleImpacts.items,
                    withIdBqtG(prixImpactEntry._id, 288, "m2")
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
            trunk: withIdBqtG(bleImpacts._id, 5, "kg"),
            impact: withIdBqtG(vitBImpactEntry._id, 20, "mmol")
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.IMPACT,
            doc: replaceItem(bleImpacts, "items", withIdBqtG(vitBImpactEntry._id, 40, "mmol"))
        }
    }
}
