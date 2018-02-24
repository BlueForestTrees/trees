import {withTrunk, withQuantity} from "../testPlumbing";
import {cols} from "../../main/const/collections";
import {prixFacetEntry, vitBFacetEntry, vitEFacetEntry, vitCFacetEntry, vitDFacetEntry} from "./facetEntries";
import {prixImpactEntry, vitBImpactEntry, vitCImpactEntry, vitDImpactEntry, co2eImpact} from "./impactEntries";

//TRUNKS
export const a = withTrunk("a", "aaaaaaaaaaaaaaaaaaaaaaaa", 1, "kg");
const b = withTrunk("b", "bbbbbbbbbbbbbbbbbbbbbbbb", 1, "kg");
const c = withTrunk("c", "cccccccccccccccccccccccc", 1, "kg");
const d = withTrunk("d", "dddddddddddddddddddddddd", 1, "kg");
const ba = withTrunk("ba", "babababababababababababa", 1, "kg");
const b2 = withTrunk("b2", "b2b2b2b2b2b2b2b2b2b2b2b2", 1, "kg");
export const da = withTrunk("da", "dadadadadadadadadadadada", 1, "kg");
export const db = withTrunk("db", "dbdbdbdbdbdbdbdbdbdbdbdb", 1, "kg");
export const e1 = withTrunk("eau", "e1e1e1e1e1e1e1e1e1e1e1e1", 1, "m3");
export const e2 = withTrunk("elec", "e2e2e2e2e2e2e2e2e2e2e2e2", 1, "kg");
const baa = withTrunk("baa", "baabaabaabaabaabaabaabaa", 1, "kg");
const bab = withTrunk("bab", "babbabbabbabbabbabbabbab", 1, "kg");
const dba = withTrunk("dba", "dbadbadbadbadbadbadbadba", 1, "kg");
const dbaa = withTrunk("dbaa", "dbaadbaadbaadbaadbaadbaa", 1, "kg");

//ROOTS
const aRoot = {
    _id: a._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": b._id, ...withQuantity(1, "kg")},
        {"_id": c._id, ...withQuantity(1, "kg")},
        {"_id": d._id, ...withQuantity(1, "kg")}
    ]
};

const bRoot = {
    _id: b._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": ba._id, ...withQuantity(1, "kg")},
        {"_id": b2._id, ...withQuantity(1, "kg")}
    ]
};
const baRoot = {
    _id: ba._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": baa._id, ...withQuantity(1, "kg")},
        {"_id": bab._id, ...withQuantity(1, "kg")}
    ]
};
const baaRoot = {
    _id: baa._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": e1._id, ...withQuantity(10, "L")}
    ]
};
const babRoot = {
    _id: bab._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": e1._id, ...withQuantity(0.5, "m3")}
    ]
};
const b2Root = {
    _id: b2._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": e2._id, ...withQuantity(1, "kg")}
    ]
};
const cRoot = {
    _id: c._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": e2._id, ...withQuantity(1, "kg")}
    ]
};

export const dRoot = {
    _id: d._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": da._id, ...withQuantity(1, "kg")},
        {"_id": db._id, ...withQuantity(1, "kg")}
    ]
};

const daRoot = {
    _id: da._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": e2._id, ...withQuantity(1, "kg")}
    ]
};

const dbRoot = {
    _id: db._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": dba._id, ...withQuantity(1, "kg")}
    ]
};

const dbaRoot = {
    _id: dba._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": dbaa._id, ...withQuantity(1, "kg")}
    ]
};
const dbaaRoot = {
    _id: dbaa._id, ...withQuantity(1, "kg"),
    items: [
        {"_id": e2._id, ...withQuantity(2, "kg")}
    ]
};

const aFacets = {
    _id: a._id,
    ...withQuantity(1,"kg"),
    items: [{
        _id: prixFacetEntry._id,
        ...withQuantity(100, "€")
    }, {
        _id: vitCFacetEntry._id,
        ...withQuantity(10, "mol")
    }, {
        _id: vitBFacetEntry._id,
        ...withQuantity(100, "mmol")
    }, {
        _id: vitEFacetEntry._id,
        ...withQuantity(120, "mmol")
    }]
};

const bFacets = {
    _id: b._id,
    items: [{
        _id: prixFacetEntry._id,
        ...withQuantity(40, "€")
    }, {
        _id: vitCFacetEntry._id,
        ...withQuantity(6, "mol")
    }, {
        _id: vitBFacetEntry._id,
        ...withQuantity(60, "mmol")
    }, {
        _id: vitDFacetEntry._id,
        ...withQuantity(80, "mmol")
    }]
};

const aImpacts = {
    _id: a._id,
    ...withQuantity(1,"kg"),
    items: [{
        _id: prixImpactEntry._id,
        ...withQuantity(100, "€")
    }, {
        _id: vitCImpactEntry._id,
        ...withQuantity(10, "mol")
    }, {
        _id: vitBImpactEntry._id,
        ...withQuantity(100, "mmol")
    }, {
        _id: co2eImpact._id,
        ...withQuantity(120, "mmol")
    }]
};

const bImpacts = {
    _id: b._id,
    items: [{
        _id: prixImpactEntry._id,
        ...withQuantity(40, "€")
    }, {
        _id: vitCImpactEntry._id,
        ...withQuantity(6, "mol")
    }, {
        _id: vitBImpactEntry._id,
        ...withQuantity(60, "mmol")
    }, {
        _id: vitDImpactEntry._id,
        ...withQuantity(80, "mmol")
    }]
};

export const database = {
    [cols.TRUNK]: [a, b, c, d, ba, b2, da, db, baa, bab, dba, dbaa, e1, e2],
    [cols.ROOT]: [aRoot, bRoot, baRoot, baaRoot, babRoot, b2Root, cRoot, dRoot, daRoot, dbRoot, dbaRoot, dbaaRoot],
    [cols.FACET]: [aFacets, bFacets],
    [cols.IMPACT]: [aImpacts, bImpacts]
};