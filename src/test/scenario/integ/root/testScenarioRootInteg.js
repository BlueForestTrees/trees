import {match, mock} from 'sinon';
import {initDatabase, run} from "../testIntegPlumbing";
import {bleRootDeletionSpec} from "../../../expected/root/testDeleteRootData";
import {deleteRoot} from "./testDeleteRootInteg";
import {postRoot} from "./testPostRootInteg";
import {bleToFarineAddSpec} from "../../../expected/root/testPostRootData";

describe('SCENARIO Root', function () {

    beforeEach(async () => {
        await initDatabase();
    });

    it('suppr puis réajout du blé à la farine',
        run(() => deleteRoot(bleRootDeletionSpec)
            .then(
                () => postRoot(bleToFarineAddSpec))
        ));
});

