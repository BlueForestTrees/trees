import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import {emptyGroup, withId} from "trees-query";
import {isNil} from 'lodash';
import {removeQuantity} from "trees-query";
import {applyQuantity} from "../../util/calculations";

const collection = () => col(cols.IMPACT);

export const getImpact = _id =>
    collection()
        .findOne(withId(_id))
        .then(impact => isNil(impact) ? emptyGroup(_id) : impact);


export const loadImpact = _id =>
    getImpact(_id)
        .then(removeQuantity);

export const loadQuantifiedImpacts = (quantity, _id) => {
    return getImpact(_id)
        .then(impacts => applyQuantity(quantity, impacts));
};

export const loadDenseQuantifiedImpacts = ({quantity, _id}) => {
    return getImpact(_id)
        .then(impact => applyQuantity(quantity, impact))
        .then(impact => impact.items);
};