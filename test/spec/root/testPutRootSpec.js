import {oneModifiedResponse} from "test-api-express-mongo/dist/domain"
import {setBqt, withIdBqtG} from "test-api-express-mongo/dist/domain"
import {clon} from "test-api-express-mongo/dist/util"
import {cols} from "../../../src/const/collections"
import _ from 'lodash'
import {bleTrunk, farineRoot, farineTrunk, gateauRoot, gateauTrunk, laitTrunk} from "../../database/gateau"

let someFarine = withIdBqtG(farineTrunk._id, 10000, "Mass")
let someBle = withIdBqtG(bleTrunk._id, 60*20, "Duré")

const putRootUrl = {method: "PUT", url: '/api/root'}

export const setQuantityRootSpec = {
    req: {
        ...putRootUrl,
        body: {
            trunk: someFarine,
            root: someBle
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: {
                ...someFarine,
                items: [someBle],
            }
        }
    }
}


export const putRelativeToRootSpec = {
    req: {
        ...putRootUrl,
        body: {
            trunk: someFarine,
            root: {
                ...withIdBqtG(laitTrunk._id, 0.001, "Volu"),
                relativeTo: {
                    _id: bleTrunk._id,
                    refqt: {bqt: 50320, g: "Mass"},
                    disqt: {bqt: 1000000, g: "Long"}
                }
            }
        }
    },
    res: {
        body: oneModifiedResponse
    },
    db: {
        expected: {
            colname: cols.ROOT,
            doc: {
                ...someFarine,
                items: [
                    ...farineRoot.items,
                    {
                        ...withIdBqtG(laitTrunk._id, 0.001, "Volu"),
                        relativeTo: {
                            _id: bleTrunk._id,
                            refqt: {bqt: 50320, g: "Mass"},
                            disqt: {bqt: 1000000, g: "Long"}
                        }
                    }
                ],
            }
        }
    }
}


export const updateQuantityRootSpec = {}
const updatedRoots = clon(gateauRoot.items)
setBqt(updatedRoots[1], 60)

updateQuantityRootSpec.req = {
    ...putRootUrl,
    body: {
        trunk: {
            _id: gateauTrunk._id,
            quantity: {
                g: "Mass",
                bqt: 250
            }
        },
        root: {
            _id: laitTrunk._id,
            quantity: {
                g: "L",
                bqt: 30
            }
        }
    }
}
updateQuantityRootSpec.res = {
    body: oneModifiedResponse
}
updateQuantityRootSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            ...(_.omit(gateauRoot, "items")),
            items: updatedRoots,
        }
    }
}

export const updateQuantityAnotherUnitRootSpec = {}
const updatedRootsWithDifferentUnit = clon(gateauRoot.items)
setBqt(updatedRootsWithDifferentUnit[1], 0.01, "m3")

updateQuantityAnotherUnitRootSpec.req = {
    ...putRootUrl,
    body: {
        trunk: {
            _id: gateauTrunk._id,
            quantity: {
                g: "Mass",
                bqt: 1000
            }
        },
        root: {
            _id: laitTrunk._id,
            quantity: {
                g: "Volu",
                bqt: 0.02
            }
        }
    }
}
updateQuantityAnotherUnitRootSpec.res = {
    body: oneModifiedResponse
}
updateQuantityAnotherUnitRootSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: {
            ...(_.omit(gateauRoot, "items")),
            items: updatedRootsWithDifferentUnit,
        }
    }
}
