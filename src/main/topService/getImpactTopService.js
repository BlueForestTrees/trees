import {peekImpactEntries} from "../service/impactEntry/getImpactEntryService";
import {getImpact} from "../service/impact/getImpactService";
import _ from 'lodash';
import {applyQuantity} from "../util/calculations";
import {removeQuantity} from "trees-query";

export const loadImpact = _id =>
    getImpact(_id)
        .then(populateImpactNames)
        .then(removeQuantity);

export const loadQuantifiedImpacts = (quantity, _id) => {
    return getImpact(_id)
        .then(populateImpactNames)
        .then(impacts => applyQuantity(quantity, impacts));
};

export const loadDenseQuantifiedImpacts = ({quantity, _id}) => {
    return getImpact(_id)
        .then(impact => applyQuantity(quantity, impact))
        .then(impact => impact.items);
};

const populateImpactNames = async impact => {
    const names = await peekImpactEntries(_.map(impact.items, "_id"));
    _.forEach(names, e => {
        _.find(impact.items, {_id: e._id}).name = e.name;
    });
    return impact;
};
