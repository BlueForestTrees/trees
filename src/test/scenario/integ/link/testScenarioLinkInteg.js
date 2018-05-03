import {init, request, run} from "../../../util/testIntegApp";
import {deleteLink} from "./testDeleteLinkInteg";
import {postLink} from "./testPostLinkInteg";
import {bleLinkDeletionSpec} from "../../../spec/link/testDeleteLinkSpec";
import {bleToFarineLinkAddSpec} from "../../../spec/link/testPostLinkSpec";
import {withQuantity} from "../../../util/testUtil";

describe('SCENARIO Link', function () {

    beforeEach(init);

    it('suppr puis réajout du blé à la farine',
        run(() => deleteLink(bleLinkDeletionSpec)
            .then(
                () => postLink(bleToFarineLinkAddSpec))
        ));

    it('post parent, post enfant, put link, get parent tree',
        run(
            () => linkThenGet(allGet200)
        )
    );
});

const linkThenGet = async testedGet => {
    const parentId = await postTrunk("parent");
    const childId = await postTrunk("enfant");
    link(parentId, childId)
        .then(testedGet(parentId))
        .then(testedGet(childId))
};

const postTrunk = async name => request()
    .post('/api/trunk')
    .send({name, grandeur: "Nomb"})
    .then(res => res.body._id);

const link = (parentId, childId) => request()
    .put('/api/link')
    .send({trunk: {_id: parentId, ...withQuantity(1, "count")}, root: {_id: childId, ...withQuantity(1, "count")}});

const allGet200 = (parentId) => () => Promise.all([
    get200(`/api/trunk/${parentId}`),
    get200(`/api/tank/1/count/${parentId}`),
    get200(`/api/root/1/count/${parentId}`),
    get200(`/api/facet/1/count/${parentId}`),
    get200(`/api/impact/1/count/${parentId}`),
    get200(`/api/impacttank/1/count/${parentId}`),
    get200(`/api/branch/1/count/${parentId}`)
]);

const get200 = url => request()
    .get(url)
    .then(async (res) => {
        res.should.have.status(200);
    });
