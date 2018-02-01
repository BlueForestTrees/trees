import _ from 'lodash';
import {clon} from "../../testUtil";
import {cols} from "../../../main/const/collections";
import {addObjects} from "../../../main/util/addObjectID";

export const withQuantity = (qt, unit) => ({quantity: {qt, unit}});

export const setQuantity = (trunk, qt, unit) => {
    unit = unit ? unit : trunk.quantity.unit;
    trunk.quantity = {qt, unit};
};



export const leftTrunk = {
    "_id": "5a6a03c03e77667641d2d2c0",
    "name": "leftTrunk",
    "name_lower": "lefttrunk"
};
export const rightTrunk = {
    "_id": "5a6a03c03e77667641d2d2c1",
    "name": "rightTrunk",
    "name_lower": "righttrunk"
};

export const downTrunkNoQt = {
    "_id": "5a6a03c03e77667641d2d2c2",
    "name": "ChildNoQt",
    "name_lower": "childnoqt"
};
export const trunkQtRootsQt = {
    "_id": "5a6a03c03e77667641d2d2c3",
    "name": "trunkQtRootsQt",
    "name_lower": "trunkqtrootsqt",
    ...withQuantity(20,"min")
};

export const laRoot = {
    _id: trunkQtRootsQt._id,
    items: [
        {"_id": rightTrunk._id, ...withQuantity(150,"g")},
        {"_id": downTrunkNoQt._id, ...withQuantity(20,"kg")}
    ]
};

const laRoot2 = {
    _id: rightTrunk._id,
    items: [
        {_id: leftTrunk._id}
    ]
};

export const oneFacetEntry = {
    _id: "5a6a03c03e77667641d2d2c4",
    name: "vitamine C",
    grandeur: "Densité"
};
export const anotherFacetEntry = {
    _id: "5a6a03c03e77667641d2d2c5",
    name: "vitamine B",
    grandeur: "Longueur"
};
export const anoAnotherFacetEntry = {
    _id: "5a6a03c03e77667641d2d2c6",
    name: "terrain",
    grandeur: "Surface"
};

export const laFacet = {
    _id: leftTrunk._id,
    items: [{
        _id: oneFacetEntry._id,
        ...withQuantity(69,"mol")
    }, {
        _id: anotherFacetEntry._id,
        ...withQuantity(3,"km")
    }]
};

export const database = {
    [cols.TRUNK]: [
        leftTrunk,
        rightTrunk,
        trunkQtRootsQt,
        downTrunkNoQt,
    ],
    [cols.ROOT]: [
        laRoot,
        laRoot2
    ],
    [cols.FACET_ENTRY]: [
        oneFacetEntry,
        anotherFacetEntry,
        anoAnotherFacetEntry
    ],
    [cols.FACET]: [
        laFacet
    ]
};

export const nameOf = (_id) => {
    return _.find(initialTrees, {_id}).name;
};


export const nameOfFacet = (_id) => {
    return _.find(initialFacetEntries, {_id}).name;
};

export const initialTrees = database[cols.TRUNK];
export const initialFacetEntries = database[cols.FACET_ENTRY];

export const initialDB = {
    [cols.TRUNK]: addObjects(clon(database[cols.TRUNK])),
    [cols.ROOT]: addObjects(clon(database[cols.ROOT])),
    [cols.FACET_ENTRY]: addObjects(clon(database[cols.FACET_ENTRY])),
    [cols.FACET]: addObjects(clon(database[cols.FACET]))
};

