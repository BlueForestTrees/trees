import {readRootTree} from "../service/root/rootQueries";
import _ from 'lodash';
import {loadDenseQuantifiedImpacts} from "./getImpactTopService";
import {flatten, summify} from "../util/calculations";
import {peekImpactEntries} from "../service/impactEntry/getImpactEntryService";
import {debug} from "../util/debug";

export const getImpactTank = async (qt, unit, _id) => {
    const tree = await readRootTree(qt, unit, _id);
    debug({tree});

    const treeNodes = listify(tree);
    debug({treeNodes});

    const impacts = await Promise.all(_.map(treeNodes, loadDenseQuantifiedImpacts));
    debug({impacts});

    const flattenItems = flatten(impacts);
    debug({flattenItems});

    const summedItems = summify(flattenItems);
    debug({summedItems});

    const tank = {
        _id,
        quantity: {qt, unit},
        items: summedItems
    };

    debug({tank});

    await populateImpactNames(tank);

    return tank;
};

const listify = tree => {
    const browser = [tree];
    let i = 0;
    for (i; i < browser.length; i++) {
        const item = browser[i];
        if (item.items) {
            browser.push(...item.items);
        }
    }
    return browser;
};

const populateImpactNames = async impact => {
    const names = await peekImpactEntries(_.map(impact.items, "_id"));
    _.forEach(names, e => {
        _.find(impact.items, {_id: e._id}).name = e.name;
    });
    return impact;
};