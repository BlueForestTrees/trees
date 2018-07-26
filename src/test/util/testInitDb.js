import {initDatabase} from "./testIntegDatabase";

describe('INIT Tool', async function () {
    this.timeout(15000);
    it('init DB', initDatabase);
});