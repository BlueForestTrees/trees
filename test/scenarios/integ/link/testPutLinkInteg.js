import {init, withTest} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {bleTrunk, farineTrunk} from "../../../database/gateau"
import {skateTrunk} from "../../../database/skate"
import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {withIdBqtG} from "test-api-express-mongo/dist/domain"
import {setQuantityRootSpec, updateQuantityRootSpec} from "../../../spec/root/testPutRootSpec"
import {setQuantityBranchSpec, updateQuantityBranchSpec} from "../../../spec/branch/testPutBranchSpec"

describe('PUT Link', function () {

    beforeEach(init(api, ENV, cols))

    it('set quantity with relativeTo', withTest({
        req: {
            method: "PUT",
            url: "/api/link",
            body: {
                trunk: withIdBqtG(farineTrunk._id, 10000, "Mass"),
                root: {
                    ...withIdBqtG(skateTrunk._id, 3, "Nomb"),
                    relativeTo: {
                        _id: bleTrunk._id,
                        refqt: {bqt: 104000, g: "Mass"},
                        disqt: {bqt: 1000000, g: "Long"}
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
                            ...withIdBqtG(farineTrunk._id, 10000, "Mass"),
                            items: [
                                {_id:bleTrunk._id},
                                {
                                    ...withIdBqtG(skateTrunk._id, 3, "Nomb"),
                                    relativeTo: {
                                        _id: bleTrunk._id,
                                        refqt: {bqt: 104000, g: "Mass"},
                                        disqt: {bqt: 1000000, g: "Long"}
                                    },
                                }
                            ],
                        }
                    },
                    {
                        colname: cols.BRANCH,
                        doc: {
                            ...withIdBqtG(skateTrunk._id, 3, "Nomb"),
                            items: [
                                {
                                    ...withIdBqtG(farineTrunk._id, 10000, "Mass")
                                }
                            ],
                        }
                    }
                ]
            }
        }
    }))

    it('set quantity', withTest({
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
    }))

    it('update quantity', withTest({
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
    }))
})