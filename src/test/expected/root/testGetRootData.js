import _ from 'lodash';
import {farineRoot, gateauRoot, lait, nameOf, setQuantity} from "../../scenario/integ/testIntegDatabase";
import {clon} from "../../testUtil";

const withNames = items => _.forEach(items, root => root.name = nameOf(root._id));
const withDoubleQt = items => _.forEach(items, root => root.quantity.qt *= 2);
const withoutQuantity = items => _.map(items, item => _.omit(item, "quantity"));

export const getRoots = {};
const gateauItemsWithNames = withoutQuantity(withNames(clon(gateauRoot.items)));
getRoots.req = {
    _id: gateauRoot._id
};
getRoots.res = {
    body: {
        ..._.omit(gateauRoot, ["items","quantity"]),
        items: gateauItemsWithNames
    }
};

export const emptyGetRoot = {};
emptyGetRoot.req = {
    _id: lait._id
};
emptyGetRoot.res = {
    body: {
        _id: lait._id,
        items: []
    }
};

const sameQtItems = withNames(clon(gateauRoot.items));
export const sameQtGetRoot = {};
sameQtGetRoot.req = {
    qt: gateauRoot.quantity.qt,
    unit: gateauRoot.quantity.unit,
    _id: gateauRoot._id
};
sameQtGetRoot.res = {
    body: {
        ..._.omit(gateauRoot, "items"),
        items: sameQtItems
    }
};


export const otherQtGetRoot = {};
const gateauRootWithDoubleQuantity = clon(gateauRoot);
withNames(gateauRootWithDoubleQuantity.items);
withDoubleQt([gateauRootWithDoubleQuantity]);
withDoubleQt(gateauRootWithDoubleQuantity.items);

otherQtGetRoot.req = {
    qt: gateauRootWithDoubleQuantity.quantity.qt,
    unit: gateauRootWithDoubleQuantity.quantity.unit,
    _id: gateauRootWithDoubleQuantity._id
};
otherQtGetRoot.res = {
    body: {
        ...gateauRootWithDoubleQuantity
    }
};


export const otherUnitGetRoot = {};
const gateauRoot1Kg = clon(gateauRoot);
withNames(gateauRoot1Kg.items);
gateauRoot1Kg.quantity.qt = 1;
gateauRoot1Kg.quantity.unit = "kg";
withDoubleQt(gateauRoot1Kg.items);

otherUnitGetRoot.req = {
    qt: gateauRoot1Kg.quantity.qt,
    unit: gateauRoot1Kg.quantity.unit,
    _id: gateauRoot1Kg._id
};
otherUnitGetRoot.res = {
    body: {
        ...gateauRoot1Kg
    }
};

export const farineNoBleQtGetRoot = {};
const myFarineRoot = clon(farineRoot);
withNames(myFarineRoot.items);
setQuantity(myFarineRoot, 60,"g");

farineNoBleQtGetRoot.req = {
    qt: myFarineRoot.quantity.qt,
    unit: myFarineRoot.quantity.unit,
    _id: myFarineRoot._id
};
farineNoBleQtGetRoot.res = {
    body: {
        ...myFarineRoot
    }
};