import _ from 'lodash';
import {clon, setQuantity, withoutQuantity, withQtCoef} from "../../util/testUtil";
import {farineRoot, gateauRoot, laitTrunk} from "../../database/gateau";
import {skateRoot} from "../../database/skate";
import {withTrunkInfos} from "../../util/testIntegDatabase";
import {banane, bananeBC, transport} from "../../database/banane";

export const getBananeRootSpec = {
    req: {
        method: "GET",
        url: `/api/root/1/count/${bananeBC._id}`
    },
    res: {
        bodypath: {path: `$.items[?(@.name==="${transport.name}")].relativeTo`, value: banane._id}
    }
};

export const getRootsSpec = {
    req: {
        method: "GET",
        url: `/api/root/${gateauRoot._id}`
    },
    res: {
        body: {
            _id: gateauRoot._id,
            items: withoutQuantity(withTrunkInfos(clon(gateauRoot.items)))
        }
    }
};

export const emptyGetRootSpec = {
    req: {
        method: "GET",
        url: `/api/root/${laitTrunk._id}`
    },
    res: {
        body: {
            _id: laitTrunk._id,
            items: []
        }
    }
};

export const sameQtGetRootSpec = {
    req: {
        method: "GET",
        url: `/api/root/${gateauRoot.quantity.qt}/${gateauRoot.quantity.unit}/${gateauRoot._id}`
    },
    res: {
        body: {
            ..._.omit(gateauRoot, "items"),
            items: withTrunkInfos(clon(gateauRoot.items))
        }
    }
};


const gato1000G = clon(gateauRoot);
withTrunkInfos(gato1000G.items);
withQtCoef([gato1000G]);
withQtCoef(gato1000G.items);

export const gateau1000GGetRootSpec = {
    req: {
        method: "GET",
        url: `/api/root/${gato1000G.quantity.qt}/${gato1000G.quantity.unit}/${gato1000G._id}`
    },
    res: {
        body: {
            ...gato1000G
        }
    }
};


const skate10 = clon(skateRoot);
withTrunkInfos(skate10.items);
withQtCoef([skate10]);
withQtCoef(skate10.items);
export const skate10GetRootSpec = {
    req: {
        method: "GET",
        url: `/api/root/${skate10.quantity.qt}/${skate10.quantity.unit}/${skate10._id}`
    },
    res: {
        body: {
            ...skate10
        }
    }
};

const gateauRoot1Kg = clon(gateauRoot);
withTrunkInfos(gateauRoot1Kg.items);
gateauRoot1Kg.quantity.qt = 1;
gateauRoot1Kg.quantity.unit = "kg";
withQtCoef(gateauRoot1Kg.items);

export const otherUnitGetRootSpec = {
    req: {
        method: "GET",
        url: `/api/root/${gateauRoot1Kg.quantity.qt}/${gateauRoot1Kg.quantity.unit}/${gateauRoot1Kg._id}`
    },
    res: {
        body: {
            ...gateauRoot1Kg
        }
    }
};


const gateauRoot1L = clon(gateauRoot);
withTrunkInfos(gateauRoot1L.items);
gateauRoot1L.quantity.unit = "L";

export const badUnitGetRootSpec = {
    req: {
        method: "GET",
        url: `/api/root/${gateauRoot1L.quantity.qt}/${gateauRoot1L.quantity.unit}/${gateauRoot1L._id}`
    },
    res: {
        code: 400,
        errorMessage: "Units mismatch: 'L' and 'g'"
    }
};


const myFarineRoot = clon(farineRoot);
withTrunkInfos(myFarineRoot.items);
setQuantity(myFarineRoot, 60, "g");
export const farineNoBleQtGetRootSpec = {
    req: {
        method: "GET",
        url: `/api/root/${myFarineRoot.quantity.qt}/${myFarineRoot.quantity.unit}/${myFarineRoot._id}`
    },
    res: {
        body: {
            ...myFarineRoot
        }
    }
};

