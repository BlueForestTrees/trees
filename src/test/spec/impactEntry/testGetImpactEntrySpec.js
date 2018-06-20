import {prixImpactEntry} from "../../database/impactEntries";

export const getImpactEntrySpec = {};

getImpactEntrySpec.req = {
    url: "/api/impactEntry?q=IP"
};

getImpactEntrySpec.res = {
    body: [
        {
            "_id": "5a6a03c03e77667641d2d2c6",
            "name": "IPrix",
            "grandeur": "Coût",
            "color": prixImpactEntry.color
        }
    ]
};