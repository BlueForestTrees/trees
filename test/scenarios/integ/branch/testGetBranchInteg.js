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
                items: withInfos(cols.TRUNK, farineBranch.items)
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

})