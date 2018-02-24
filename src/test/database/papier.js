import {cols} from "../../main/const/collections";
import {withQuantity, withTrunkAuto} from "../testPlumbing";
import {co2eImpact} from "./impactEntries";

export const papierVA = withTrunkAuto("papier version A", 100, "m2");
const papierVB = withTrunkAuto("papier version B", 50, "m2");

const couchePE = withTrunkAuto("couche Plastique Polyéthylène", 1, "t");
const couchePapier = withTrunkAuto("couche Papier", 1, "t");
const coucheAdhesif = withTrunkAuto("couche Adhésif", 1, "t");
const coucheAlu = withTrunkAuto("couche Alu", 1, "t");

const papierVARoot = {
    _id: papierVA._id, ...withQuantity(100, "m2"),
    items: [
        {_id: couchePE._id, ...withQuantity(780, "kg")},
        {_id: couchePapier._id, ...withQuantity(2070, "kg")},
        {_id: coucheAdhesif._id, ...withQuantity(80, "kg")},
        {_id: coucheAlu._id, ...withQuantity(890, "kg")}
    ]
};

const papierVBRoot = {
    _id: papierVB._id, ...withQuantity(100, "m2"),
    items: [
        {_id: couchePE._id, ...withQuantity(780, "kg")},
        {_id: couchePapier._id, ...withQuantity(2070, "kg")},
        {_id: coucheAdhesif._id, ...withQuantity(80, "kg")},
    ]
};

const impactCouchePE = {
    _id: couchePE._id, ...withQuantity(1, "t"),
    items: [
        {_id: co2eImpact._id, ...withQuantity(1920.512820513, "kg")}
    ]
};
const impactCouchePapier = {
    _id: couchePapier._id, ...withQuantity(1, "t"),
    items: [
        {_id: co2eImpact._id, ...withQuantity(410.144927536, "kg")}
    ]
};
const impactCoucheAdhesif = {
    _id: coucheAdhesif._id, ...withQuantity(1, "kg"),
    items: [
        {_id: co2eImpact._id, ...withQuantity(7.45, "kg")}
    ]
};
const impactCoucheAlu = {
    _id: coucheAlu._id, ...withQuantity(1, "t"),
    items: [
        {_id: co2eImpact._id, ...withQuantity(9834.831460674, "kg")}
    ]
};

export const database = {
    [cols.TRUNK]: [papierVA, papierVB, coucheAdhesif, coucheAlu, couchePapier, couchePE],
    [cols.ROOT]: [papierVARoot, papierVBRoot],
    [cols.IMPACT]: [impactCouchePE, impactCouchePapier, impactCoucheAdhesif, impactCoucheAlu]
};
