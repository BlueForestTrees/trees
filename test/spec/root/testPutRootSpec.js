import {oneModifiedResponse} from "api-test/dist/domain"
import {setQuantity, withIdQuantity} from "api-test/dist/domain"
import {clon} from "api-test/dist/util"
import {cols} from "../../../src/const/collections"
import _ from 'lodash'
import {bleTrunk, farineRoot, farineTrunk, gateauRoot, gateauTrunk, laitTrunk} from "../../database/gateau"

let someFarine = withIdQuantity(farineTrunk._id, 10, "kg")
let someBle = withIdQuantity(bleTrunk._id, 20, "min")

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
                ...withIdQuantity(laitTrunk._id, 1, "L"),
                relativeTo: {
                    _id: bleTrunk._id,
                    refqt: {qt: 50.32, unit: "kg"},
                    disqt: {qt: 1000, unit: "km"}
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
                        ...withIdQuantity(laitTrunk._id, 1, "L"),
                        relativeTo: {
                            _id: bleTrunk._id,
                            refqt: {qt: 50.32, unit: "kg"},
                            disqt: {qt: 1000, unit: "km"}
                        }
                    }
                ],
            }
        }
    }
}


export const updateQuantityRootSpec = {}
const updatedRoots = clon(gateauRoot.items)
setQuantity(updatedRoots[1], 60)

updateQuantityRootSpec.req = {
    ...putRootUrl,
    body: {
        trunk: {
            _id: gateauTrunk._id,
            quantity: {
                unit: "g",
                qt: 250
            }
        },
        root: {
            _id: laitTrunk._id,
            quantity: {
                unit: "L",
                qt: 30
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
setQuantity(updatedRootsWithDifferentUnit[1], 0.01, "m3")

updateQuantityAnotherUnitRootSpec.req = {
    ...putRootUrl,
    body: {
        trunk: {
            _id: gateauTrunk._id,
            quantity: {
                unit: "kg",
                qt: 1
            }
        },
        root: {
            _id: laitTrunk._id,
            quantity: {
                unit: "m3",
                qt: 0.02
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
