import {match, mock} from 'sinon';
import {bleRootDeletionSpec} from "../../../expected/root/testDeleteRootData";
import {deleteRoot} from "./testDeleteRootInteg";
import {postRoot} from "./testPostRootInteg";
import {bleToFarineAddSpec} from "../../../expected/root/testPostRootData";

import {run} from "../../../util/testPlumbing";
import {init} from "../../../util/testIntegApp";

describe('SCENARIO Root', function () {

    beforeEach(init);

    it('suppr puis réajout du blé à la farine',
        run(() => deleteRoot(bleRootDeletionSpec)
            .then(
                () => postRoot(bleToFarineAddSpec))
        ));
});

