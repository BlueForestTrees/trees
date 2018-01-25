import {purgeFacets} from "../../src/service/facets";
import {purgeTrunks} from "../../src/service/trunks";

export const purgeDatabase = ()=>{
    purgeFacets();
    purgeTrunks();
};

export const objectID = /^[a-fA-F0-9]{24}$/;