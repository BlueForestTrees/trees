import {run} from "../../../util/testPlumbing";
import {deleteLink} from "./testDeleteLinkInteg";
import {postLink} from "./testPostLinkInteg";
import {bleLinkDeletionSpec} from "../../../expected/link/testDeleteLinkData";
import {bleToFarineLinkAddSpec} from "../../../expected/link/testPostLinkData";
import {init} from "../../../util/testIntegApp";

describe('SCENARIO Link', function () {

    beforeEach(init);

    it('suppr puis réajout du blé à la farine',
        run(() => deleteLink(bleLinkDeletionSpec)
            .then(
                () => postLink(bleToFarineLinkAddSpec))
        ));
});

