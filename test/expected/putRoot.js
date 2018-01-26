import {childNoQt, leftTree, rightTree, withQtParentTree} from "../data/database";
import {oneModifiedResponse} from "./common";
import {cols} from "../../src/const/collections";
import _ from 'lodash';

export const justIds = {};
justIds.req = {
    body: {
        trunk: {
            _id: leftTree._id
        },
        root: {
            _id: rightTree._id
        }
    }
};
justIds.res = {
    body: oneModifiedResponse
};
justIds.db = {
    expected: {
        colname: cols.TREES,
        doc: {
            ...leftTree,
            "ressources": [
                {
                    "_id": rightTree._id
                }
            ],

        }
    }
};

export const definingBothQt = {};
definingBothQt.req = {
    body: {
        trunk: {
            _id: leftTree._id,
            quantity: {
                unit: "min",
                qt: 20
            }
        },
        root: {
            _id: rightTree._id,
            quantity: {
                unit: "kg",
                qt: 10
            }
        }
    }
};
definingBothQt.res = {
    body: oneModifiedResponse
};
definingBothQt.db = {
    expected: {
        colname: cols.TREES,
        doc: {
            ...leftTree,
            "quantity": definingBothQt.req.body.trunk.quantity,
            "ressources": [
                {
                    "_id": rightTree._id,
                    "qt": definingBothQt.req.body.root.quantity.qt,
                    "unit": definingBothQt.req.body.root.quantity.unit
                }
            ],

        }
    }
};

export const updatingTrunkQt = {};
updatingTrunkQt.req = {
    body: {
        trunk: {
            _id: withQtParentTree._id,
            quantity: {
                unit: "min",
                qt: 60
            }
        },
        root: {
            _id: childNoQt._id,
            quantity: {
                unit: "kg",
                qt: 30
            }
        }
    }
};
updatingTrunkQt.res = {
    body: oneModifiedResponse
};
updatingTrunkQt.db = {
    expected: {
        colname: cols.TREES,
        doc: {
            ...(_.omit(withQtParentTree,'ressources')),
            "ressources": [
                {
                    "_id": childNoQt._id,
                    "qt": 10,
                    "unit": "kg"
                }
            ],

        }
    }
};

export const differentUnit = {};
differentUnit.req = {
    body: {
        trunk: {
            _id: withQtParentTree._id,
            quantity: {
                unit: "h",
                qt: 1
            }
        },
        root: {
            _id: childNoQt._id,
            quantity: {
                unit: "g",
                qt: 300
            }
        }
    }
};
differentUnit.res = {
    body: oneModifiedResponse
};
differentUnit.db = {
    expected: {
        colname: cols.TREES,
        doc: {
            ...(_.omit(withQtParentTree,'ressources')),
            "ressources": [
                {
                    "_id": childNoQt._id,
                    "qt": 100,
                    "unit": "g"
                }
            ],

        }
    }
};
