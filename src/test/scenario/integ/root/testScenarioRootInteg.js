import {bleRootDeletionSpec} from "../../../spec/root/testDeleteRootSpec";
import {deleteRoot} from "./testDeleteRootInteg";
import {postRoot} from "./testPostRootInteg";
import {bleToFarineAddSpec} from "../../../spec/root/testPostRootSpec";

import {init, run} from "../../../util/testIntegApp";

describe('SCENARIO Root', function () {

    beforeEach(init);

    it('suppr puis réajout du blé à la farine',
        run(() => deleteRoot(bleRootDeletionSpec)
            .then(
                () => postRoot(bleToFarineAddSpec))
        ));
});

