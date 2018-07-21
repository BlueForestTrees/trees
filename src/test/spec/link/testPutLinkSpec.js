import {setQuantityRootSpec, updateQuantityAnotherUnitRootSpec, updateQuantityRootSpec} from "../root/testPutRootSpec";
import {setQuantityBranchSpec, updateQuantityAnotherUnitBranchSpec, updateQuantityBranchSpec} from "../branch/testPutBranchSpec";
import {bleTrunk, farineTrunk} from "../../database/gateau";
import {oneModifiedResponse} from "../testCommonSpec";
import {skateTrunk} from "../../database/skate";
import {cols} from "../../../main/const/collections";
import {withIdQuantity} from "../../util/testUtil";

export const putLinkRelativeToSpec = {
    req: {
        method: "PUT",
        url: "/api/link",
        body: {
            trunk: withIdQuantity(farineTrunk._id, 10, "kg"),
            root: {
                ...withIdQuantity(skateTrunk._id, 3, "count"),
                relativeTo: {
                    _id: bleTrunk._id,
                    refqt: {qt: 104, unit: "kg"},
                    disqt: {qt: 1000, unit: "km"}
                },
            }
        }
    },
    res: {
        body: [oneModifiedResponse, oneModifiedResponse]
    },
    db: {
        expected: {
            list: [
                {
                    colname: cols.ROOT,
                    doc: {
                        ...withIdQuantity(farineTrunk._id, 10, "kg"),
                        items: [
                            {_id:bleTrunk._id},
                            {
                                ...withIdQuantity(skateTrunk._id, 3, "count"),
                                relativeTo: {
                                    _id: bleTrunk._id,
                                    refqt: {qt: 104, unit: "kg"},
                                    disqt: {qt: 1000, unit: "km"}
                                },
                            }
                            ],
                    }
                },
                {
                    colname: cols.BRANCH,
                    doc: {
                        ...withIdQuantity(skateTrunk._id, 3, "count"),
                        items: [
                            {
                                ...withIdQuantity(farineTrunk._id, 10, "kg")
                            }
                        ],
                    }
                }
            ]
        }
    }
};

export const setQuantityLinkSpec = {
    req: {
        method: "PUT",
        url: "/api/link",
        body: setQuantityRootSpec.req.body
    },
    res: {
        body: [setQuantityRootSpec.res.body, setQuantityBranchSpec.res.body]
    },
    db: {
        expected: {
            list: [setQuantityRootSpec.db.expected, setQuantityBranchSpec.db.expected]
        }
    }
};
export const updateQuantityLinkSpec = {
    req: {
        method: "PUT",
        url: "/api/link",
        body: updateQuantityRootSpec.req.body
    },
    res: {
        body: [updateQuantityRootSpec.res.body, updateQuantityBranchSpec.res.body]
    },
    db: {
        expected: {
            list: [updateQuantityRootSpec.db.expected, updateQuantityRootSpec.db.expected]
        }
    }
};
export const updateQuantityAnotherUnitLinkSpec = {
    req: {
        method: "PUT",
        url: "/api/link",
        body: updateQuantityAnotherUnitRootSpec.req.body
    },
    res: {
        body: [updateQuantityAnotherUnitRootSpec.res.body, updateQuantityAnotherUnitBranchSpec.res.body]
    },
    db: {
        expected: {
            list: [updateQuantityAnotherUnitRootSpec.db.expected, updateQuantityAnotherUnitBranchSpec.db.expected]
        }
    }
};
