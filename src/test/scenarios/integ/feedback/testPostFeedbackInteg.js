import {init, withTest} from "../../../util/testIntegApp";
import {postFeedbadBadMailSpec, postFeedbackOkSpec} from "../../../spec/feedback/testPostFeedbackSpec";

describe('POST FacetEntry', function () {

    beforeEach(init);

    it('post an ok feedback', withTest(postFeedbackOkSpec));

    it('post a bad mail feedback', withTest(postFeedbadBadMailSpec));

});