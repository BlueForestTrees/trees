import {withNameIdQuantity, withQuantity} from "../testPlumbing";
import {cols} from "../../main/const/collections";
import {prixFacetEntry, vitBFacetEntry, vitCFacetEntry} from "./facetEntries";

//TRUNKS
export const a = withNameIdQuantity("a", "aaaaaaaaaaaaaaaaaaaaaaaa", 1, "kg");
const b = withNameIdQuantity("b", "bbbbbbbbbbbbbbbbbbbbbbbb", 1, "kg");
const c = withNameIdQuantity("c", "cccccccccccccccccccccccc", 1, "kg");
const d = withNameIdQuantity("d", "dddddddddddddddddddddddd", 1, "kg");
const ba = withNameIdQuantity("ba", "babababababababababababa", 1, "kg");
const b2 = withNameIdQuantity("b2", "b2b2b2b2b2b2b2b2b2b2b2b2", 1, "kg");
export const da = withNameIdQuantity("da", "dadadadadadadadadadadada", 1, "kg");
export const db = withNameIdQuantity("db", "dbdbdbdbdbdbdbdbdbdbdbdb", 1, "kg");
export const e1 = withNameIdQuantity("end1", "e1e1e1e1e1e1e1e1e1e1e1e1", 1, "m3");
export const e2 = withNameIdQuantity("end2", "e2e2e2e2e2e2e2e2e2e2e2e2", 1, "kg");
const baa = withNameIdQuantity("baa", "baabaabaabaabaabaabaabaa", 1, "kg");
const bab = withNameIdQuantity("bab", "babbabbabbabbabbabbabbab", 1, "kg");
const dba = withNameIdQuantity("dba", "dbadbadbadbadbadbadbadba", 1, "kg");
const dbaa = withNameIdQuantity("dbaa", "dbaadbaadbaadbaadbaadbaa", 1, "kg");

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
    items: [{
        _id: prixFacetEntry._id,
        ...withQuantity(100, "€")
    }, {
        _id: vitCFacetEntry._id,
        ...withQuantity(10, "mol")
    }, {
        _id: vitBFacetEntry._id,
        ...withQuantity(100, "mmol")
    }]
};

export const database = {
    [cols.TRUNK]: [a, b, c, d, ba, b2, da, db, baa, bab, dba, dbaa, e1, e2],
    [cols.ROOT]: [aRoot, bRoot, baRoot, baaRoot, babRoot, b2Root, cRoot, dRoot, daRoot, dbRoot, dbaRoot, dbaaRoot],
    [cols.FACET]: [aFacets]
};

