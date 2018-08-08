import {withInfos} from "test-api-express-mongo/dist/db"
import {run, withTest, init, request} from "test-api-express-mongo/dist/api"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"
import {farineBranch, laitBranch, pizzaTrunk} from "../../../database/gateau"
import {withError, withQtCoef, withoutQuantity} from "test-api-express-mongo/dist/domain"
import {omit} from 'lodash'
import {clon} from "test-api-express-mongo/dist/util"

describe('GET Branch', function () {

    beforeEach(init(api, ENV, cols))

    it('return branchs', withTest({
        req: {
            url: `/api/branch/${farineBranch._id}`
        },
        res: {
            body: () => ({
                ...omit(farineBranch, ['items', 'quantity']),
                items: withInfos(cols.TRUNK, withoutQuantity(clon(farineBranch.items)))
            })
        }
    }))

    it('return empty branchs', withTest({
        req: {
            url: `/api/branch/${pizzaTrunk._id}`
        },
        res: {
            body: {
                _id: pizzaTrunk._id,
                items: []
            }
        }
    }))

    it('return an error because unit mismatch', withTest({
        req: {
            url: `/api/branch/4/Volu/${farineBranch._id}`
        },
        res: {
            code: 400,
            body: withError(3, "Units mismatch: 'Volu' and 'Mass'")
        }
    }))

    it('return branch with same quantity', withTest({
        req: {
            url: `/api/branch/${farineBranch.quantity.bqt}/${farineBranch.quantity.g}/${farineBranch._id}`
        },
        res: {
            body: () => ({
                ...omit(farineBranch, 'items'),
                items: withInfos(cols.TRUNK, clon(farineBranch.items))
            })
        }
    }))

    it('return branch with another quantity', withTest({
        req: {
            url: `/api/branch/${farineBranch.quantity.bqt * 2}/${farineBranch.quantity.g}/${farineBranch._id}`
        },
        res: {
            body: () => ({
                ...withQtCoef(farineBranch, 2),
                items: withInfos(cols.TRUNK, withQtCoef(farineBranch.items, 2))
            })
        }
    }))

    it('return branch even with no qt in branchs', withTest({
        req: {
            url: `/api/branch/${laitBranch.quantity.bqt}/${laitBranch.quantity.g}/${laitBranch._id}`
        },
        res: {
            body: () => ({
                ...omit(laitBranch, 'items'),
                items: withInfos(cols.TRUNK, clon(laitBranch.items))
            })
        }
    }))

})