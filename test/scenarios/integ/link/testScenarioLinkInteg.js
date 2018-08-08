import {init, request, run} from "test-api-express-mongo/dist/api"
import {withQuantity} from "test-api-express-mongo/dist/domain"
import {putLinkBleFarine} from "../../../spec/link/testPutLinkSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('SCENARIO Link', function () {

    beforeEach(init(api, ENV, cols))

    it('post parent, post enfant, put link, get parent tree',
        run(
            () => linkThenGet(allGet200)
        )
    )
})

const linkThenGet = async testedGet => {
    const parentId = await postTrunk("parent")
    const childId = await postTrunk("enfant")
    link(parentId, childId)
        .then(testedGet(parentId))
        .then(testedGet(childId))
}

const postTrunk = async name => request()
    .post('/api/trunk')
    .send({color:"#00F",name, grandeur: "Nomb"})
    .then(res => res.body._id)

const link = (parentId, childId) => request()
    .put('/api/link')
    .send({trunk: {_id: parentId, ...withQuantity(1, "Nomb")}, root: {_id: childId, ...withQuantity(1, "Nomb")}})

const allGet200 = (parentId) => () => Promise.all([
    get200(`/api/trunk/${parentId}`),
    get200(`/api/tank/1/Nomb/${parentId}`),
    get200(`/api/root/1/Nomb/${parentId}`),
    get200(`/api/facet/1/Nomb/${parentId}`),
    get200(`/api/impact/1/Nomb/${parentId}`),
    get200(`/api/impacttank/1/Nomb/${parentId}`),
    get200(`/api/branch/1/Nomb/${parentId}`)
])

const get200 = url => request()
    .get(url)
    .then(async (res) => {
        res.status.should.equal(200)
    })
