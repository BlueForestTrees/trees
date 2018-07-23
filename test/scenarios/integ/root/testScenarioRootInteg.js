import {deleteFarineRootBleSpec} from "../../../spec/root/testDeleteRootSpec";
import {deleteRoot} from "./testDeleteRootInteg";
import {postRoot} from "./testPostRootInteg";
import {postRootFarineBle} from "../../../spec/root/testPostRootSpec";
import {init, run, withTest} from "trees-test/dist/api";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";

describe('SCENARIO Root', function () {

    beforeEach(init(api, ENV, cols));

    it('suppr puis réajout du blé à la farine',
        withTest([
            deleteFarineRootBleSpec,
            postRootFarineBle
        ])
    );
});

