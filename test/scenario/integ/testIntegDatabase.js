import {cols} from "../../../src/const/collections";
import {addObjects} from "../../../src/util/addObjectID";
import _ from 'lodash';
import {clon} from "../../testUtil";

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
    "quantity": {
        "qt": 20,
        "unit": "min"
    }
};

export const laRoot = {
    _id: trunkQtRootsQt._id,
    "roots": [
        {
            "_id": rightTrunk._id,
            "qt": 150,
            "unit": "g"
        }, {
            "_id": downTrunkNoQt._id,
            "qt": 20,
            "unit": "kg"
        }
    ]
};

export const oneFacetEntry = {
    _id:"5a6a03c03e77667641d2d2c4",
    name:"vitamine C",
    grandeur:"Densité"
};
export const anotherFacetEntry = {
    _id:"5a6a03c03e77667641d2d2c5",
    name:"vitamine B",
    grandeur:"Longueur"
};
export const anoAnotherFacetEntry = {
    _id:"5a6a03c03e77667641d2d2c6",
    name:"terrain",
    grandeur:"Surface"
};

export const laFacet = {
    _id:leftTrunk._id,
    facets:[{
        _id: oneFacetEntry._id,
        qt: 69,
        unit: "mol"
    },{
        _id:anotherFacetEntry._id,
        qt:3,
        unit:"km"
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
        laRoot
    ],
    [cols.FACET_ENTRY]:[
        oneFacetEntry,
        anotherFacetEntry,
        anoAnotherFacetEntry
    ],
    [cols.FACET]: [
        laFacet
    ]
};

export const nameOf = (_id) => {
    return _.find(initialTrees,{_id}).name;
};


export const nameOfFacet = (_id) => {
    return _.find(initialFacetEntries,{_id}).name;
};

export const initialTrees = database[cols.TRUNK];
export const initialFacetEntries = database[cols.FACET_ENTRY];

export const initialDB = {
    [cols.TRUNK]: addObjects(clon(database[cols.TRUNK])),
    [cols.ROOT]: addObjects(clon(database[cols.ROOT])),
    [cols.FACET_ENTRY]: addObjects(clon(database[cols.FACET_ENTRY])),
    [cols.FACET]: addObjects(clon(database[cols.FACET]))
};

