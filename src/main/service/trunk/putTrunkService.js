import {withId} from "trees-query";
import {cols} from "../../const/collections";
import {col} from "../../db/db";

const trunks = () => col(cols.TRUNK);

export const update = async ({_id, name, quantity}) => {
    if (name)
        return await updateName({_id, name});
    else if (quantity)
        return await updateQuantity({_id, quantity});
};

export const updateName = ({_id, name}) => trunks().update(withId(_id), ({$set: {name, name_lower: name.toLowerCase()}}));

const updateQuantity = ({_id, quantity}) => trunks().update(withId(_id), ({$set: {quantity}}));