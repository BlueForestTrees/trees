import {run} from "../../../util/testIntegApp";
import {deleteLink} from "./testDeleteLinkInteg";
import {postLink} from "./testPostLinkInteg";
import {bleLinkDeletionSpec} from "../../../spec/link/testDeleteLinkSpec";
import {bleToFarineLinkAddSpec} from "../../../spec/link/testPostLinkSpec";
import {init} from "../../../util/testIntegApp";

describe('SCENARIO Link', function () {

    beforeEach(init);

    it('suppr puis réajout du blé à la farine',
        run(() => deleteLink(bleLinkDeletionSpec)
            .then(
                () => postLink(bleToFarineLinkAddSpec))
        ));
});

