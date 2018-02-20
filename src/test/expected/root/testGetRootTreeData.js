import {clon} from "../../util/testUtil";
import {withDoubleQt} from "../../testPlumbing";
import {ble, gateauRoot} from "../../database/gateau";
import {arbre} from "../../database/skate";
import {withIdQtUnit} from "../../../main/util/query";

export const gateauRootTreeSpec = {};
const gateauRoot2Kg = clon(gateauRoot);
//on fait x4 sur la quantité
gateauRoot2Kg.quantity.qt = 2;
gateauRoot2Kg.quantity.unit = "kg";
withDoubleQt(withDoubleQt(gateauRoot2Kg.items));
//on ajoute le blé à la farine
gateauRoot2Kg.items[0].items = [{_id: ble._id}];

gateauRootTreeSpec.req = {
    qt: gateauRoot2Kg.quantity.qt,
    unit: gateauRoot2Kg.quantity.unit,
    _id: gateauRoot2Kg._id
};
gateauRootTreeSpec.res = {
    body: {
        ...gateauRoot2Kg
    }
};

export const noRootsTreeSpec = {};
noRootsTreeSpec.req = {
    qt: 3,
    unit: "count",
    _id: arbre._id
};
noRootsTreeSpec.res = {
    body: {
        _id: arbre._id,
        quantity: {
            qt: 3,
            unit: "count"
        },
        items: []
    }
};