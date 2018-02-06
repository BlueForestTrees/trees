import _ from 'lodash';
import {clon} from "../../testUtil";
import {cols} from "../../../main/const/collections";
import {addObjects} from "../../../main/util/addObjectID";

export const withQuantity = (qt, unit) => ({quantity: {qt, unit}});

export const setQuantity = (trunk, qt, unit) => {
    unit = unit ? unit : trunk.quantity.unit;
    trunk.quantity = {qt, unit};
};


//TRUNK
export const biere = {
    "_id": "6a6a03c03e77667641d2d2c3",
    "name": "Bière Heineken",
    "name_lower": "biere heineken"
};
export const capsule = {
    "_id": "7a6a03c03e77667641d2d2c3",
    "name": "capsule",
    "name_lower": "capsule"
};

export const gateau = {
    "_id": "5a6a03c03e77667641d2d2c3",
    "name": "Gateau au chocolat",
    "name_lower": "gateau au chocolat",
    ...withQuantity(200,"g")
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

export const skate = {
    "_id": "999903c03e77667641d99990",
    "name": "skate",
    "name_lower": "skate",
    ...withQuantity(10,"")
};

export const planche = {
    "_id": "999903c03e77667641d99991",
    "name": "planche",
    "name_lower": "planche"
};

export const roulette = {
    "_id": "999903c03e77667641d99992",
    "name": "roulette",
    "name_lower": "roulette"
};

export const elec = {
    "_id": "999903c03e77667641d99993",
    "name": "elec",
    "name_lower": "elec"
};

export const eau = {
    "_id": "999903c03e77667641d99994",
    "name": "eau",
    "name_lower": "eau"
};

//ROOT
export const gateauRoot = {
    _id: gateau._id,
    ...withQuantity(500,"g"),
    items: [
        {"_id": farine._id, ...withQuantity(150,"g")},
        {"_id": lait._id, ...withQuantity(20,"L")}
    ]
};

export const farineRoot = {
    _id: farine._id,
    items: [
        {_id: ble._id}
    ]
};

const skateRoot = {
    _id: skate._id,
    ...withQuantity(1,""),
    items: [
        {
            _id: planche._id,
            ...withQuantity(1,"")
        },
        {
            _id: roulette._id,
            ...withQuantity(4,"")
        }
    ]
};

const plancheRoot = {
    _id: planche._id,
    ...withQuantity(1000,""),
    items: [
        {
            _id: eau._id,
            ...withQuantity(1000,"L")
        },
        {
            _id: elec._id,
            ...withQuantity(10000,"kwh")
        }
    ]
};

const rouletteRoot = {
    _id: roulette._id,
    ...withQuantity(1000000,""),
    items: [
        {
            _id: eau._id,
            ...withQuantity(1500,"L")
        },
        {
            _id: elec._id,
            ...withQuantity(20000,"kwh")
        }
    ]
};

//FACET ENTRY
export const vitCFacet = {
    _id: "5a6a03c03e77667641d2d2c4",
    name: "vitamine C",
    grandeur: "Densité"
};
export const vitBFacet = {
    _id: "5a6a03c03e77667641d2d2c5",
    name: "vitamine B",
    grandeur: "Densité"
};
export const anoAnotherFacetEntry = {
    _id: "5a6a03c03e77667641d2d2c6",
    name: "Prix",
    grandeur: "Coût"
};

//FACET
export const bleFacets = {
    _id: ble._id,
    items: [{
        _id: vitCFacet._id,
        ...withQuantity(6,"mol")
    }, {
        _id: vitBFacet._id,
        ...withQuantity(150,"mmol")
    }]
};

const gateauFacets = {
    _id: gateau._id,
    items: [{
        _id: vitCFacet._id,
        ...withQuantity(10,"mol")
    }, {
        _id: vitBFacet._id,
        ...withQuantity(100,"mmol")
    }]
};




export const database = {
    [cols.TRUNK]: [
        ble,
        farine,
        gateau,
        lait,
        biere,capsule,
        skate, planche, roulette, elec, eau
    ],
    [cols.ROOT]: [
        gateauRoot,
        farineRoot,
        skateRoot, plancheRoot, rouletteRoot
    ],
    [cols.FACET_ENTRY]: [
        vitCFacet,
        vitBFacet,
        anoAnotherFacetEntry
    ],
    [cols.FACET]: [
        bleFacets,
        gateauFacets
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

