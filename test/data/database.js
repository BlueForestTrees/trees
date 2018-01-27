import {cols} from "../../src/const/collections";
import {addObjects} from "../../src/util/addObjectID";
import _ from 'lodash';

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
export const topTrunkQt = {
    "_id": "5a6a03c03e77667641d2d2c3",
    "name": "Parent",
    "name_lower": "parent",
    "quantity": {
        "qt": 20,
        "unit": "min"
    }
};

export const laRoot = {
    _id: topTrunkQt._id,
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

export const database = {
    [cols.TRUNK]: [
        leftTrunk,
        rightTrunk,
        topTrunkQt,
        downTrunkNoQt,
    ],
    [cols.ROOT]: [
        laRoot
    ]
};

export const initialTrees = database[cols.TRUNK];

export const objectInitialDB = {
    [cols.TRUNK]: addObjects(_.cloneDeep(database[cols.TRUNK])),
    [cols.ROOT]: addObjects(_.cloneDeep(database[cols.ROOT])),
    [cols.FACET_ENTRY]: addObjects(_.cloneDeep(database[cols.FACET_ENTRY]))
};
