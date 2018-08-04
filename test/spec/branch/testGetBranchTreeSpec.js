import {aTrunk} from "../../database/lettres"
import {arbreTrunk, boisTrunk, bucheTrunk, chauffageTrunk, foretTrunk, grandeForetTrunk, plancheTrunk, refugeBioTrunk, skateTrunk} from "../../database/skate"
import {withIdQuantity, withIdQtUnit} from "test-api-express-mongo/dist/domain"

export const noBranchsTreeSpec = {
    req:{
        url:`/api/branch/tree/10/kg/${aTrunk._id}`
    },
    res:{
        body: {
            _id: aTrunk._id,
            quantity: {qt: 10,unit: "kg"},
            items: []
        }
    }
}

export const branchTreeSpec = {
    req:{
        url:`/api/branch/tree/100/count/${arbreTrunk._id}`
    },
    res:{
        body: {
            ...withIdQuantity(arbreTrunk._id, 100, "count"),
            items: [
                {
                    "_id": boisTrunk._id,
                    "quantity": {
                        "qt": 100,
                        "unit": "t"
                    },
                    "items": [
                        {
                            "_id": plancheTrunk._id,
                            "quantity": {
                                "qt": 200000,
                                "unit": "count"
                            },
                            "items": [
                                {
                                    "_id": skateTrunk._id,
                                    "quantity": {
                                        "qt": 200000,
                                        "unit": "count"
                                    }
                                }
                            ]
                        },
                        {
                            "_id": bucheTrunk._id,
                            "quantity": {
                                "qt": 100000,
                                "unit": "kg"
                            },
                            "items": [
                                {
                                    "_id": chauffageTrunk._id,
                                    "quantity": {
                                        "qt": 33333.333333333336,
                                        "unit": "h"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "_id": foretTrunk._id,
                    "quantity": {
                        "qt": 0.1,
                        "unit": "count"
                    },
                    "items": [
                        {
                            "_id": grandeForetTrunk._id,
                            "items": [
                                {
                                    "_id": refugeBioTrunk._id
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}