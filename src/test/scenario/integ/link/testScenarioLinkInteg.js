import {match, mock} from 'sinon';
import {initDatabase} from "../../../testIntegDatabase";

import {run} from "../../../testPlumbing";
import {deleteLink} from "./testDeleteLinkInteg";
import {postLink} from "./testPostLinkInteg";
import {bleLinkDeletionSpec} from "../../../expected/link/testDeleteLinkData";
import {bleToFarineLinkAddSpec} from "../../../expected/link/testPostLinkData";

describe('SCENARIO Link', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('suppr puis réajout du blé à la farine',
        run(() => deleteLink(bleLinkDeletionSpec)
            .then(
                () => postLink(bleToFarineLinkAddSpec))
        ));
});

