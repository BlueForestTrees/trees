import {peekImpactEntry} from "../service/impactEntry/getImpactEntryService";
import {getImpacts} from "../service/impact/getImpactService";
import _ from 'lodash'

export const loadImpacts = async trunkId => ({
    _id: trunkId,
    items: await getImpacts(trunkId).then(populateImpacts)
});

const populateImpacts = impacts => impacts ? Promise.all(
    _.map(impacts.items, impact =>
        peekImpactEntry(impact._id)
            .then(t => ({...impact, name: t.name}))
    )) : [];
