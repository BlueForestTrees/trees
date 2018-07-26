import {initDatabase} from "../../util/testIntegDatabase";
import {getLastVersion, setLastVersion} from "../../../main/service/version/versionService";
import chai from "chai";
import {withTest} from "../../util/testIntegApp";
import {cols} from "../../../main/const/collections";

chai.should();

const add101Version = withTest({
    db: {
        preChange: {
            colname: cols.VERSION,
            doc: {
                _id:"5b3f56df46e9b64b847494a5",
                version:"1.0.1",
                date: new Date()
            }
        }
    }
});

describe('Versions', function () {

    beforeEach(initDatabase);

    it('get Init version', async function () {
        const version = await getLastVersion();
        version.should.be.equal("0.0.0");
    });

    it('get Last version', async function () {
        await add101Version();
        const version = await getLastVersion();
        version.should.be.equal("1.0.1");
    });

    it('set Last version', async function () {
        await add101Version();
        await setLastVersion("2.0.0");
        const version = await getLastVersion();
        version.should.be.equal("2.0.0");
    });


});