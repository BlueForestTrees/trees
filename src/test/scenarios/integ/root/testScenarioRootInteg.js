import {deleteFarineRootBleSpec} from "../../../spec/root/testDeleteRootSpec";
import {deleteRoot} from "./testDeleteRootInteg";
import {postRoot} from "./testPostRootInteg";
import {postRootFarineBle} from "../../../spec/root/testPostRootSpec";

import {init, run, withTest} from "../../../util/testIntegApp";

describe('SCENARIO Root', function () {

    beforeEach(init);

    it('suppr puis réajout du blé à la farine',
        withTest([
            deleteFarineRootBleSpec,
            postRootFarineBle
        ])
    );
});

