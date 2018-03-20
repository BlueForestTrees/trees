import {oneModifiedResponse} from "../testCommonSpec";
import {remove} from "../../util/testUtil";
import {cols} from "../../../main/const/collections";
import {farineRoot, gateauRoot} from "../../database/gateau";

export const rootDeletionSpec = {};

rootDeletionSpec.req = {
    trunkId: gateauRoot._id,
    rootId: gateauRoot.items[0]._id
};

rootDeletionSpec.res = {
    expected: oneModifiedResponse
};

rootDeletionSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: remove(gateauRoot, "items", {_id: gateauRoot.items[0]._id})
    }
};

export const bleRootDeletionSpec = {};

bleRootDeletionSpec.req = {
    trunkId: farineRoot._id,
    rootId: farineRoot.items[0]._id
};

bleRootDeletionSpec.res = {
    expected: oneModifiedResponse
};

bleRootDeletionSpec.db = {
    expected: {
        colname: cols.ROOT,
        doc: remove(farineRoot, "items", {_id: farineRoot.items[0]._id})
    }
};