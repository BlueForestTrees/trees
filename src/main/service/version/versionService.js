import {cols} from "../../const/collections";
import {col} from "../../db/db";

export const getLastVersion = async () => {
    const v = await col(cols.VERSION).find().sort({date: -1}).limit(1).next();
    return v && v.version || "0.0.0"
};
export const setLastVersion = version => col(cols.VERSION).insert({date: new Date(), version});