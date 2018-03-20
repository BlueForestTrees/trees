import _ from 'lodash';
import {clon} from "../../util/testIntegUtil";
import {setQuantity, withoutQuantity, withQtCoef} from "../../util/testIntegUtil";
import {farineRoot, gateauRoot, laitTrunk} from "../../database/gateau";
import {skateRoot} from "../../database/skate";
import {withNames} from "../../util/testIntegDatabase";

export const getRootsSpec = {};
const gateauItemsWithNames = withoutQuantity(withNames(clon(gateauRoot.items)));
getRootsSpec.req = {
    _id: gateauRoot._id
};
getRootsSpec.res = {
    body: {
        ..._.omit(gateauRoot, ["items", "quantity"]),
        items: gateauItemsWithNames
    }
};

export const emptyGetRootSpec = {};
emptyGetRootSpec.req = {
    _id: laitTrunk._id
};
emptyGetRootSpec.res = {
    body: {
        _id: laitTrunk._id,
        items: []
    }
};

const sameQtItems = withNames(clon(gateauRoot.items));
export const sameQtGetRootSpec = {};
sameQtGetRootSpec.req = {
    qt: gateauRoot.quantity.qt,
    unit: gateauRoot.quantity.unit,
    _id: gateauRoot._id
};
sameQtGetRootSpec.res = {
    body: {
        ..._.omit(gateauRoot, "items"),
        items: sameQtItems
    }
};


export const gateau1000GGetRootSpec = {};
const gato1000G = clon(gateauRoot);
withNames(gato1000G.items);
withQtCoef([gato1000G]);
withQtCoef(gato1000G.items);

gateau1000GGetRootSpec.req = {
    qt: gato1000G.quantity.qt,
    unit: gato1000G.quantity.unit,
    _id: gato1000G._id
};
gateau1000GGetRootSpec.res = {
    body: {
        ...gato1000G
    }
};

export const skate10GetRootSpec = {};
const skate10 = clon(skateRoot);
withNames(skate10.items);
withQtCoef([skate10]);
withQtCoef(skate10.items);
skate10GetRootSpec.req = {
    qt: skate10.quantity.qt,
    unit: skate10.quantity.unit,
    _id: skate10._id
};
skate10GetRootSpec.res = {
    body: {
        ...skate10
    }
};

export const otherUnitGetRootSpec = {};
const gateauRoot1Kg = clon(gateauRoot);
withNames(gateauRoot1Kg.items);
gateauRoot1Kg.quantity.qt = 1;
gateauRoot1Kg.quantity.unit = "kg";
withQtCoef(gateauRoot1Kg.items);

otherUnitGetRootSpec.req = {
    qt: gateauRoot1Kg.quantity.qt,
    unit: gateauRoot1Kg.quantity.unit,
    _id: gateauRoot1Kg._id
};
otherUnitGetRootSpec.res = {
    body: {
        ...gateauRoot1Kg
    }
};


export const badUnitGetRootSpec = {};
const gateauRoot1L = clon(gateauRoot);
withNames(gateauRoot1L.items);
gateauRoot1L.quantity.unit = "L";

badUnitGetRootSpec.req = {
    qt: gateauRoot1L.quantity.qt,
    unit: gateauRoot1L.quantity.unit,
    _id: gateauRoot1L._id
};
badUnitGetRootSpec.res = {
    status: 400,
    bodyMessage: "Units mismatch: 'L' and 'g'"
};


export const farineNoBleQtGetRootSpec = {};
const myFarineRoot = clon(farineRoot);
withNames(myFarineRoot.items);
setQuantity(myFarineRoot, 60, "g");

farineNoBleQtGetRootSpec.req = {
    qt: myFarineRoot.quantity.qt,
    unit: myFarineRoot.quantity.unit,
    _id: myFarineRoot._id
};
farineNoBleQtGetRootSpec.res = {
    body: {
        ...myFarineRoot
    }
};

