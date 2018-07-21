import {initDatabase} from "../../util/testIntegDatabase";
import chai from "chai";
import {cols} from "../../../main/const/collections";
import {col} from "../../../main/db/db";
import {aid, eid} from "../../database/links";

chai.should();

const links = () => col(cols.LINK);

const rootGraphLookup = {
    $graphLookup: {
        from: cols.LINK,
        startWith: `$parent`,
        connectFromField: "child",
        connectToField: "parent",
        maxDepth: 10,
        as: "links"
    }
};

const branchGraphLookup = {
    $graphLookup: {
        from: cols.LINK,
        startWith: `$child`,
        connectFromField: "parent",
        connectToField: "child",
        maxDepth: 10,
        as: "links"
    }
};

const getRootGraph = id => links().aggregate([{$match: {parent: id}}, rootGraphLookup]).next();
const getBranchGraph = id => links().aggregate([{$match: {child: id}}, branchGraphLookup]).next();


describe('Links', function () {

    beforeEach(initDatabase);

    it('rootGraph', async function () {
        (await getRootGraph(aid)).should.not.deep.equal({});
    });

    it('branchGraph', async function () {
        (await getBranchGraph(eid)).should.not.deep.equal({});
    });

});