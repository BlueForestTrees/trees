import {init, withTest} from "trees-test/dist/api"
import {postFeedbadBadMailSpec, postFeedbackOkSpec} from "../../../spec/feedback/testPostFeedbackSpec"
import api from "../../../../src"
import ENV from "../../../../src/env"
import {cols} from "../../../../src/const/collections"

describe('POST FacetEntry', function () {

    beforeEach(init(api, ENV, cols))

    it('post an ok feedback', withTest(postFeedbackOkSpec))

    it('post a bad mail feedback', withTest(postFeedbadBadMailSpec))

})