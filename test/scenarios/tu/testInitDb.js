import {initDatabase} from "test-api-express-mongo";
import {cols} from "../../../src/collections";
import ENV from "../../../src/env";

describe('INIT Tool', async function () {
    it('init DB', initDatabase(ENV, cols));
});