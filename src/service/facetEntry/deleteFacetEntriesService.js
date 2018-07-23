import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";

const facetEntries = () => col(cols.FACET_ENTRY);

export const purgeFacetsEntries = async () => facetEntries().deleteMany();