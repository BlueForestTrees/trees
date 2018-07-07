import {cols} from "../../const/collections";
import {col} from "../../db/db";

const facetEntries = () => col(cols.FACET_ENTRY);

export const purgeFacetsEntries = async () => facetEntries().deleteMany();