import {clon} from "trees-test/dist/util";
import _ from 'lodash';
import {bleImpacts, farineTrunk} from "../../database/gateau";
import {withQuantity} from "trees-test/dist/domain";


const bleImpactWithImpactEntryFields = _.forEach(clon(bleImpacts.items), impact => {
    delete impact.quantity;
});
export const getImpactSpec = {
    req: {
        url: `/api/impact/${bleImpacts._id}`
    },
    res: {
        body: {
            _id: bleImpacts._id,
            items: bleImpactWithImpactEntryFields
        }
    }
};

const resultItems = _.forEach(clon(bleImpacts.items), bleImpact => {
    bleImpact.quantity.qt *= 0.5;
});
export const getQuantifiedImpactSpec = {
    req: {
        url: `/api/impact/5000/g/${bleImpacts._id}`
    }, res: {
    body: {
        _id: bleImpacts._id,
        ...withQuantity(5000,"g"),
        items: resultItems
    }
    }
};

export const emptyGetImpactSpec = {
    req: {
        url: `/api/impact/${farineTrunk._id}`
    },
    res: {
    body: {
        _id: farineTrunk._id,
        items: []
    }
    }
};


export const emptyQuantifiedGetImpactSpec = {
    req: {
        url: `/api/impact/15/g/5a6a03c03e77667641d21234`
    }, res: {
        body: {
            _id: "5a6a03c03e77667641d21234",
            ...withQuantity(15, "g"),
            items: []
        }
    }
};