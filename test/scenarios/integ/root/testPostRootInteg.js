import {existingRootPostSpec, newRootSpec} from "../../../spec/root/testPostRootSpec";
import api from "../../../../src";
import ENV from "../../../../src/env";
import {cols} from "../../../../src/const/collections";
import {run, withTest} from "trees-test/dist/api";
import {init} from "trees-test/dist/api";

describe('POST Root', function () {

    beforeEach(init(api, ENV, cols));

    it('newRoot', withTest(newRootSpec));

    it('existing root', withTest(existingRootPostSpec));
});