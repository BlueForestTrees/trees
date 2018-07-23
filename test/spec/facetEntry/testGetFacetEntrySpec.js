import {omit} from 'lodash';
import {notInSearchMixin} from "trees-test/dist/domain";
import {vitBFacetEntry, vitCFacetEntry, vitDFacetEntry, vitEFacetEntry} from "../../database/facetEntries";

export const searchFacetEntrySpec = {
    req: {
        url: "/api/facetEntry?q=Vitami"
    },
    res: {
        body: [
            omit(vitBFacetEntry, notInSearchMixin),
            omit(vitCFacetEntry, notInSearchMixin),
            omit(vitDFacetEntry, notInSearchMixin),
            omit(vitEFacetEntry, notInSearchMixin),
        ]
    }
};
