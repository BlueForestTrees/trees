import {readRootTree} from "../service/root/rootQueries";
import _ from 'lodash';
import {loadDenseQuantifiedImpacts} from "./getImpactTopService";
import {flatten, summify} from "../util/calculations";
import {peekImpactEntries} from "../service/impactEntry/getImpactEntryService";

export const getImpactTank = (qt, unit, _id) =>
    readRootTree(qt, unit, _id)
        .then(async tree => ({
            _id,
            quantity: {qt, unit},
            items: summify(flatten(await Promise.all(_.map(listify(tree), loadDenseQuantifiedImpacts))))
        }))
        .then(populateImpactNames);

const listify = tree => {
    const browser = [tree];
    let i = 0;
    for (i; i < browser.length; i++) {
        const item = browser[i];
        if(item.items) {
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