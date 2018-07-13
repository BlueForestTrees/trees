import {init, withTest} from "../../../util/testIntegApp";

describe('POST fake address', function () {

    beforeEach(init);

    it('valid confirm test', withTest({
        req: {
            url: "/fake/url/impossible/to/use"
        },
        res: {
            code: 404,
            body: null
        }
    }));


});