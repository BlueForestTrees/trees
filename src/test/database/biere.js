import {cols} from "../../main/const/collections";
import {withTrunkNoQt} from "../util/testPlumbing";

export const biere = withTrunkNoQt("Bière Heineken", "6a6a03c03e77667641d2d2c3");
export const capsule = withTrunkNoQt("capsule", "7a6a03c03e77667641d2d2c3");

export const database = {
    [cols.TRUNK]: [biere, capsule]
};