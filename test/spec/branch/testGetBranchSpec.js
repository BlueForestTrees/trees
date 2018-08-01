import {omit} from 'lodash'
import {withError, withValidationError} from "api-test/dist/domain"
import {clon} from "api-test/dist/util"
import {withoutQuantity, withQtCoef} from "api-test/dist/domain"
import {withInfos} from "api-test/dist/db"

import {farineBranch, laitBranch, pizzaTrunk} from "../../database/gateau"
import {cols} from "../../../src/const/collections"

export const getBranchsSpec = {
    req: {
        url: `/api/branch/${farineBranch._id}`
    },
    res: {
        body: () => ({
            ...omit(farineBranch, ['items', 'quantity']),
            items: withInfos(cols.TRUNK, withoutQuantity(clon(farineBranch.items)))
        })
    }
}

export const emptyGetBranchSpec = {
    req: {
        url: `/api/branch/${pizzaTrunk._id}`
    },
    res: {
        body: {
            _id: pizzaTrunk._id,
            items: []
        }
    }
}

export const sameQtGetBranchSpec = {
    req: {
        url: `/api/branch/${farineBranch.quantity.qt}/${farineBranch.quantity.unit}/${farineBranch._id}`
    },
    res: {
        body: () => ({
            ...omit(farineBranch, 'items'),
            items: withInfos(cols.TRUNK, clon(farineBranch.items))
        })
    }
}

const farine1000G = clon(farineBranch)
withQtCoef([farine1000G])
withQtCoef(farine1000G.items)
export const farine1000GGetBranchSpec = {
    req: {
        url: `/api/branch/${farine1000G.quantity.qt}/${farine1000G.quantity.unit}/${farine1000G._id}`
    },
    res: {
        body: () => ({
            ...omit(farine1000G, 'items'),
            items: withInfos(cols.TRUNK, clon(farine1000G.items))
        })
    }
}

const farineBranch1Kg = clon(farineBranch)
farineBranch1Kg.quantity.qt = 1
farineBranch1Kg.quantity.unit = "kg"
withQtCoef(farineBranch1Kg.items,5)
export const otherUnitGetBranchSpec = {
    req: {
        url: `/api/branch/${farineBranch1Kg.quantity.qt}/${farineBranch1Kg.quantity.unit}/${farineBranch1Kg._id}`
    },
    res: {
        body: () => ({
            ...omit(farineBranch1Kg, 'items'),
            items: withInfos(cols.TRUNK, clon(farineBranch1Kg.items))
        })
    }
}


const gateauBranch1L = clon(farineBranch)
gateauBranch1L.quantity.unit = "L"
export const badUnitGetBranchSpec = {
    req: {
        url: `/api/branch/${gateauBranch1L.quantity.qt}/${gateauBranch1L.quantity.unit}/${gateauBranch1L._id}`
    },
    res: {
        code: 400,
        body: withError(3, "Units mismatch: 'L' and 'g'")
    }
}

export const branchWithoutQtSpec = {
    req: {
        url: `/api/branch/${laitBranch.quantity.qt}/${laitBranch.quantity.unit}/${laitBranch._id}`
    },
    res: {
        body: () => ({
            ...omit(laitBranch, 'items'),
            items: withInfos(cols.TRUNK, clon(laitBranch.items))
        })
    }
}