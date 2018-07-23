import _ from 'lodash';
import {vitCImpactEntry} from "../../database/impactEntries";
import {cols} from "../../../src/const/collections";

export const postImpactEntrySpec = {
    req: {
        url: `/api/impactEntry`,
        method: "POST",
        body: {
            _id: "847",
            name: "nomNewImpactEntry",
            grandeur: "Dens",
            color: "#FFFFFF"
        }
    },
    db: {
        expected: {
            colname: cols.IMPACT_ENTRY,
            doc: {
                _id: "847",
                name: "nomNewImpactEntry",
                name_lower: "nomnewimpactentry",
                grandeur: "Dens",
                color: "#FFFFFF",
            }
        }
    }
};

export const postBadGrandeurImpactEntrySpec = {
    req: {
        url: "/api/impactEntry",
        method: "POST",
        body: {
            name: "nomNewImpactEntry",
            grandeur: "Dens   ité"
        }
    },
    res: {
        code: 400,
        bodypath: {axisD: "$.errors.grandeur.msg", value: "Invalid value"}
    }
};


export const allreadyExistingImpactEntrySpec = {
    req: {
        url: "/api/impactEntry",
        method: "POST",
        body: {
            ..._.omit(vitCImpactEntry, ["name_lower"])
        }
    },
    res: {
        code: 666
    }
};