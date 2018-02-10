import {ble, gateauRoot} from "../../scenario/integ/testIntegDatabase";
import {clon} from "../../testUtil";
import {withDoubleQt} from "../../scenario/integ/testIntegPlumbing";

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

//TODO un grand arbre à faire.