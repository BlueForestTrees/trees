import _ from 'lodash';
import {vitCImpactEntry} from "../../database/impactEntries";
import {cols} from "../../../main/const/collections";

export const postImpactEntrySpec = {};
postImpactEntrySpec.req = {
    body: {
        name: "nomNewImpactEntry",
        grandeur: "Dens",
        color:"#FFFFFF"
    }
};
postImpactEntrySpec.res = {
    body: _id => ({_id})
};
postImpactEntrySpec.db = {
    expected: _id => ({
        colname: cols.IMPACT_ENTRY,
        doc: {
            _id,
            name: "nomNewImpactEntry",
            name_lower: "nomnewimpactentry",
            grandeur: "Dens",
            color: "#FFFFFF",
        }
    })
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


export const allreadyExistingImpactEntrySpec = {};
allreadyExistingImpactEntrySpec.req = {
    body: {
        ..._.omit(vitCImpactEntry, ["_id","name_lower"])
    }
};
allreadyExistingImpactEntrySpec.res = {
    body: _id => ({_id})
};