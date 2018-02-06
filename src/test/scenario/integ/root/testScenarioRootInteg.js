import {match, mock} from 'sinon';
import {initDatabase, run} from "../testIntegPlumbing";
import {bleRootDeletion} from "../../../expected/root/testDeleteRootData";
import {deleteRoot} from "./testDeleteRootInteg";
import {postRoot} from "./testPostRootInteg";
import {bleToFarineAdd} from "../../../expected/root/testPostRootData";

describe('SCENARIO Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('suppr puis réajout du blé à la farine',
        run(() => deleteRoot(bleRootDeletion)
            .then(
                () => postRoot(bleToFarineAdd))
        ));
});

