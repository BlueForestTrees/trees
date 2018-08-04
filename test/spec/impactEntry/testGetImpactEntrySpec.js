import {prixImpactEntry} from "../../database/impactEntries"

export const getImpactEntrySpec = {}

getImpactEntrySpec.req = {
    url: "/api/impactEntry?q=IP"
}

getImpactEntrySpec.res = {
    body: [
        {
            "_id": prixImpactEntry._id,
            "name": "IPrix",
            "grandeur": "Coût",
            "color": prixImpactEntry.color
        }
    ]
}