import {cols} from "../../main/const/collections";
import {vitBFacetEntry, vitCFacetEntry} from "./facetEntries";
import {withQuantity} from "../testPlumbing";
import {vitBImpactEntry, vitCImpactEntry} from "./impactEntries";

export const gateau = {
    "_id": "5a6a03c03e77667641d2d2c3",
    "name": "Gateau au chocolat",
    "name_lower": "gateau au chocolat",
    ...withQuantity(200, "g")
};
export const farine = {
    "_id": "5a6a03c03e77667641d2d2c1",
    "name": "Farine",
    "name_lower": "farine"
};

export const lait = {
    "_id": "5a6a03c03e77667641d2d2c2",
    "name": "Lait",
    "name_lower": "lait"
};

export const ble = {
    "_id": "5a6a03c03e77667641d2d2c0",
    "name": "blé",
    "name_lower": "blé"
};

export const gateauRoot = {
    _id: gateau._id,
    ...withQuantity(500, "g"),
    items: [
        {"_id": farine._id, ...withQuantity(150, "g")},
        {"_id": lait._id, ...withQuantity(20, "L")}
    ]
};
export const farineRoot = {
    _id: farine._id,
    items: [
        {_id: ble._id}
    ]
};

const gateauFacets = {
    _id: gateau._id,
    items: [{
        _id: vitCFacetEntry._id,
        ...withQuantity(10, "mol")
    }, {
        _id: vitBFacetEntry._id,
        ...withQuantity(100, "mmol")
    }]
};
export const bleFacets = {
    _id: ble._id,
    ...withQuantity(10, "kg"),
    items: [{
        _id: vitCFacetEntry._id,
        ...withQuantity(6, "mol")
    }, {
        _id: vitBFacetEntry._id,
        ...withQuantity(150, "mmol")
    }]
};

const gateauImpact = {
    _id: gateau._id,
    items: [{
        _id: vitCImpactEntry._id,
        ...withQuantity(10, "mol")
    }, {
        _id: vitBImpactEntry._id,
        ...withQuantity(100, "mmol")
    }]
};
export const bleImpacts = {
    _id: ble._id,
    ...withQuantity(10, "kg"),
    items: [{
        _id: vitCImpactEntry._id,
        ...withQuantity(6, "mol")
    }, {
        _id: vitBImpactEntry._id,
        ...withQuantity(150, "mmol")
    }]
};

export const database =  {
    [cols.TRUNK]: [gateau, lait, farine, ble],
    [cols.ROOT]: [gateauRoot, farineRoot],
    [cols.FACET]: [gateauFacets, bleFacets],
    [cols.IMPACT]: [gateauImpact, bleImpacts]
};