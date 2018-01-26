import {cols} from "../../src/const/collections";
import {addObjects} from "../../src/util/addObjectID";
import _ from 'lodash';

export const leftTree = {
    "_id": "5a6a03c03e77667641d2d2c0",
    "name": "trunkName",
    "name_lower": "trunkname"
};
export const rightTree = {
    "_id": "5a6a03c03e77667641d2d2c1",
    "name": "Doudou",
    "name_lower": "doudou"
};

export const childNoQt = {
    "_id": "5a6a03c03e77667641d2d2c3",
    "name": "Dodu",
    "name_lower": "dodu"
};
export const withQtParentTree = {
    "_id": "5a6a03c03e77667641d2d2c2",
    "name": "Parent",
    "name_lower": "parent",
    "quantity": {
        "qt": 20,
        "unit": "min"
    },
    "ressources": [
        {
            "_id": childNoQt._id,
            "qt": 20,
            "unit": "kg"
        }
    ]
};

export const initialDB = {
    [cols.TREES]: [
        leftTree,
        rightTree,
        withQtParentTree,
        childNoQt,
    ],
    [cols.FACETS]: []
};

export const initialTrees = initialDB[cols.TREES];

export const objectInitialDB = {
    [cols.TREES]: addObjects(_.cloneDeep(initialTrees, true)),
    [cols.FACETS]: _.clone(initialDB[cols.FACETS], true)
};
