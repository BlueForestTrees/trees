import {withId} from "../../util/query";
import {cols} from "../../const/collections";
import {col} from "../../repo";
import {getQuantity} from "./getTrunkService";

const trunks = () => col(cols.TRUNK);

export const update = async ({_id, name, quantity}) => {
    if (name)
        return await updateName({_id, name});
    else if (quantity)
        return await updateQuantity({_id, quantity});
};

export const updateName = ({_id, name}) => trunks().update(withId(_id), ({$set: {name, name_lower: name.toLowerCase()}}));
export const updateQuantity = ({_id, quantity}) => trunks().update(withId(_id), ({$set: {quantity}}));


export const getSertQuantity = async trunk => {
    const qt = await getQuantity(trunk._id);
    if (qt) {
        return qt;
    } else if (trunk.quantity && trunk.quantity.qt && trunk.quantity.unit) {
        await updateQuantity({_id: trunk._id, quantity: trunk.quantity});
        return trunk.quantity;
    } else {
        return {};
    }
};

