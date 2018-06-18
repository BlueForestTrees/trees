import {omit} from 'lodash';
import {notInSearchMixin} from "../testCommonSpec";
import {vitBFacetEntry, vitCFacetEntry, vitDFacetEntry, vitEFacetEntry} from "../../database/facetEntries";

export const searchFacetEntrySpec = {
    req: {
        url: "GET /api/facetEntry?q=ami"
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
