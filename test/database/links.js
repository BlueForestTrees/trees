import {cols} from "../../src/const/collections";

export const aid = "aaaaaaaaaaaaaaaaaaaaaaaa";
const bid = "bbbbbbbbbbbbbbbbbbbbbbbb";
const cid = "cccccccccccccccccccccccc";
const did = "dddddddddddddddddddddddd";
export const eid = "eeeeeeeeeeeeeeeeeeeeeeee";

const ab = {_id: "0000000000000000000000ab", parent: aid, child: bid};
const ac = {_id: "0000000000000000000000ac", parent: aid, child: cid};
const cd = {_id: "0000000000000000000000cd", parent: cid, child: did};
const ce = {_id: "0000000000000000000000ce", parent: cid, child: eid};

export const database = {
    [cols.LINK]: [ab, ac, cd, ce]
};