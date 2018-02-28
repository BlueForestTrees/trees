import {withItem, withTrunk, withTrunkNoQt} from "../testPlumbing";
import {cols} from "../../main/const/collections";

export const skateTrunk = withTrunk("skate", "999903c03e77667641d99990", 10, "count");
export const plancheTrunk = withTrunkNoQt("planche", "999903c03e77667641d99991");
export const boisTrunk = withTrunkNoQt("bois", "999903c03e77667641d99995");
export const arbreTrunk = withTrunkNoQt("arbre", "999903c03e77667641d99996");
export const rouletteTrunk = withTrunkNoQt("roulette", "999903c03e77667641d99992");
export const elecTrunk = withTrunkNoQt("elec", "999903c03e77667641d99993");
export const eauTrunk = withTrunkNoQt("eau", "999903c03e77667641d99994");

export const skateRoot = {...withItem(skateTrunk._id, 1, "count"), items: [withItem(plancheTrunk._id, 1, "count"), withItem(rouletteTrunk._id, 4, "count")]};
const plancheRoot = {...withItem(plancheTrunk._id, 1000, "count"), items: [withItem(eauTrunk._id, 1000, "L"), withItem(elecTrunk._id, 10000, "kwh"), withItem(boisTrunk._id, 500, "kg")]};
const boisRoot = {...withItem(boisTrunk._id, 1, "t"), items: [withItem(arbreTrunk._id, 1, "count")]};
const rouletteRoot = {...withItem(rouletteTrunk._id, 1000000, "count"), items: [withItem(eauTrunk._id, 1500, "L"), withItem(elecTrunk._id, 20000, "kwh")]};

const plancheBranch = {...withItem(plancheTrunk._id, 1, "count"), items: [withItem(skateTrunk._id, 1, "count")]};
const rouletteBranch = {...withItem(rouletteTrunk._id, 1, "count"), items: [withItem(skateTrunk._id, 0.25, "count")]};
const eauBranch = {...withItem(eauTrunk._id, 1500, "L"), items: [withItem(plancheTrunk._id, 1500, "count"), withItem(rouletteTrunk._id, 1000000, "count")]};
const elecBranch = {...withItem(elecTrunk._id, 10, "kwh"), items: [withItem(plancheTrunk._id, 1, "count"), withItem(rouletteTrunk._id, 50, "count")]};
const boisBranch = {...withItem(boisTrunk._id, 500, "kg"), items: [withItem(plancheTrunk._id, 1000, "count")]};
const arbreBranch = {...withItem(arbreTrunk._id, 1, "count"), items: [withItem(boisTrunk._id, 1, "t")]};

export const database = {
    [cols.TRUNK]: [skateTrunk, plancheTrunk, boisTrunk, arbreTrunk, rouletteTrunk, elecTrunk, eauTrunk],
    [cols.ROOT]: [skateRoot, plancheRoot, boisRoot, rouletteRoot],
    [cols.BRANCH]: [plancheBranch, rouletteBranch, eauBranch, elecBranch, boisBranch, arbreBranch]
};
