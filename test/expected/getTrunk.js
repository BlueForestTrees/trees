import {initialTrees, rightTree, withQtParentTree} from "../data/database";
import {removeObjects} from "../../src/util/addObjectID";
import _ from 'lodash';

export const getAll = {
    res: {
        body: removeObjects(initialTrees)
    }
};

const searchResult = _.pick(rightTree, ['_id', 'name']);

export const search = {
    req: {
        term: rightTree.name.substring(0, 3),
    },
    res: {
        body: [searchResult]
    }
};

export const trunk = {};
trunk.req = {
    _id: withQtParentTree._id
};
trunk.res = {
    body: {
        "_id": "5a6a03c03e77667641d2d2c2",
        "name": "Parent",
        "qt": null,
        "quantity": {
            "qt": 20,
            "unit": "min"
        },
        "roots": [
            {
                "_id": "5a6a03c03e77667641d2d2c3",
                "name": "Dodu",
                "qt": 20,
                "unit": "kg",
                "roots": []
            }
        ]
    }
};