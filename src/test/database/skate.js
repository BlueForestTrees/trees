import {withQuantity} from "../testIntegPlumbing";
import {cols} from "../../main/const/collections";

export const skate = {
    "_id": "999903c03e77667641d99990",
    "name": "skate",
    "name_lower": "skate",
    ...withQuantity(10, "")
};

export const planche = {
    "_id": "999903c03e77667641d99991",
    "name": "planche",
    "name_lower": "planche"
};

export const bois = {
    "_id": "999903c03e77667641d99995",
    "name": "bois",
    "name_lower": "bois"
};

export const arbre = {
    "_id": "999903c03e77667641d99996",
    "name": "arbre",
    "name_lower": "arbre"
};

export const roulette = {
    "_id": "999903c03e77667641d99992",
    "name": "roulette",
    "name_lower": "roulette"
};

export const elec = {
    "_id": "999903c03e77667641d99993",
    "name": "elec",
    "name_lower": "elec"
};

export const eau = {
    "_id": "999903c03e77667641d99994",
    "name": "eau",
    "name_lower": "eau"
};


export const skateRoot = {
    _id: skate._id,
    ...withQuantity(1, "count"),
    items: [
        {
            _id: planche._id,
            ...withQuantity(1, "count")
        },
        {
            _id: roulette._id,
            ...withQuantity(4, "count")
        }
    ]
};

const plancheRoot = {
    _id: planche._id,
    ...withQuantity(1000, "count"),
    items: [
        {
            _id: eau._id,
            ...withQuantity(1000, "L")
        },
        {
            _id: elec._id,
            ...withQuantity(10000, "kwh")
        },
        {
            _id: bois._id,
            ...withQuantity(500, "kg")
        }
    ]
};

const boisRoot = {
    _id: bois._id,
    ...withQuantity(1, "t"),
    items: [
        {
            _id: arbre._id,
            ...withQuantity(1, "count")
        }
    ]
};

const rouletteRoot = {
    _id: roulette._id,
    ...withQuantity(1000000, "count"),
    items: [
        {
            _id: eau._id,
            ...withQuantity(1500, "L")
        },
        {
            _id: elec._id,
            ...withQuantity(20000, "kwh")
        }
    ]
};

export const database =  {
    [cols.TRUNK]: [skate, planche, bois, arbre, roulette, elec, eau],
    [cols.ROOT]: [skateRoot, plancheRoot, boisRoot, rouletteRoot]
};