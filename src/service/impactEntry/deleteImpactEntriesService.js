import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";

const impactEntries = () => col(cols.IMPACT_ENTRY);

export const purgeImpactsEntries = async () => impactEntries().deleteMany();