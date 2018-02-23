import {cols} from "../../const/collections";
import {col} from "../../repo";
import {withId} from "../../util/query";

const impacts = () => col(cols.IMPACT);

export const getImpacts = async _id => impacts().findOne(withId(_id));